import { useEffect, useState, useCallback, FormEvent, useRef } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Button, Input } from 'antd';
import styles from './map.module.scss';
import { updateOrigin, updateDestination } from '../../redux/order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  onNext: () => void;
}

export const AutoCompleteCustom = ({ onPlaceSelect, onNext }: Props) => {
  const map = useMap();
  const places = useMapsLibrary('places');
  const dispatch = useDispatch(); // Get the dispatch function
  const origin = useSelector((state: any) => state.order.origin);
  const destination = useSelector((state: any) => state.order.destination);
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken>();
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<Array<google.maps.places.AutocompletePrediction>>([]);
  const [predictionDestinationResults, setPredictionDestinationResults] = useState<Array<google.maps.places.AutocompletePrediction>>([]);

  const [originValue, setoriginValue] = useState<string>('');
  const [destinationValue, setDestinationValue] = useState<string>('');

  const autocompleteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      autocompleteRefs.current.every(ref => ref && !ref.contains(event.target as Node))
    ) {
      setPredictionResults([]);
      setPredictionDestinationResults([]);
    }
  };

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setAutocompleteService(null);
    };
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string, direction: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        setPredictionDestinationResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken, componentRestrictions: { country: 'AZ' } };
      const response = await autocompleteService.getPlacePredictions(request);

      if (direction === 'inception') setPredictionResults(response.predictions);
      else setPredictionDestinationResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;
      setoriginValue(value);
      fetchPredictions(value, 'inception');
      dispatch(updateOrigin(value));
    },
    [dispatch, fetchPredictions]
  );

  const onDestinationInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;
      setDestinationValue(value);
      fetchPredictions(value, 'destination');
      dispatch(updateDestination(value)); // dispatch eklendi
    },
    [dispatch, fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;
  
      const detailRequestOptions = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken,
      };
  
      const detailsRequestCallback = (placeDetails: google.maps.places.PlaceResult | null) => {
        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setoriginValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
  
        // Seçilmiş ünvan məlumatlarını Redux-a göndəririk
        dispatch(updateOrigin(placeDetails));
      };
  
      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken, dispatch]
  );

  const handleSuggestionDestinationClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      dispatch(updateDestination(placeId));

      const detailRequestOptions = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken,
      };

      const detailsRequestCallback = (placeDetails: google.maps.places.PlaceResult | null) => {
        onPlaceSelect(placeDetails);
        setPredictionDestinationResults([]);
        setDestinationValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken, dispatch] // dispatch eklendi
  );

  const setAutocompleteRef = useCallback((element: HTMLDivElement | null, index: number) => {
    autocompleteRefs.current[index] = element;
  }, []);

  return (
    <div className={styles.mapSideIn}>
      <div>
        <h2 className='text-3xl font-bold'>Başlanğıc və bitiş nöqtələrini seçin</h2>
        <div ref={el => setAutocompleteRef(el, 0)} className="autocomplete-container mt-3 relative">
          <Input
            value={originValue}
            variant="filled"
            onInput={onInputChange}
            placeholder="Yük götürülmə yerini daxil edin"
            className="w-full"
            size='large'
          />

          {predictionResults.length > 0 && (
            <ul className="custom-list absolute top-full left-0 z-10 bg-white w-full border border-gray-300">
              {predictionResults.map(({ place_id, description }) => {
                return (
                  <li
                    key={place_id}
                    className="custom-list-item py-2 px-4 text-base cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(place_id)}
                  >
                    {description}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div ref={el => setAutocompleteRef(el, 1)} className="autocomplete-container mt-3 relative">
          <Input
            value={destinationValue}
            variant='filled'
            onInput={onDestinationInputChange}
            placeholder="Hara gediləcək"
            size='large'
            className="w-full"
          />

          {predictionDestinationResults.length > 0 && (
            <ul className="custom-list absolute top-full left-0 z-10 bg-white w-full border border-gray-300">
              {predictionDestinationResults.map(({ place_id, description }) => {
                return (
                  <li
                    key={place_id}
                    className="custom-list-item py-2 px-4 text-base cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionDestinationClick(place_id)}
                  >
                    {description}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <Button
        disabled={!origin || !destination}
        className='mt-4 p-5'
        style={{ backgroundColor: 'black', color: 'white' }}
        onClick={onNext}
        type="primary"
        size='large'
      >
        Davam et
      </Button>
    </div>
  );
};