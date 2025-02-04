import {ControlPosition} from '@vis.gl/react-google-maps';

import SideMap from './side-map';

type AutocompleteMode= {id: string; label: string};

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  selectedAutocompleteMode: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({
  onPlaceSelect
}: CustomAutocompleteControlProps) => {
  return (
      <SideMap onPlaceSelect={onPlaceSelect} />
  );
};
