import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDistance } from "../../redux/map/mapSlice";


export const MapDirections = () => {
  const dispatch = useDispatch();
  const originLatitude = useSelector((state: number) => state.map.originLatitude);
  const originLongitude = useSelector((state: number) => state.map.originLongitude);
  const destinationLatitude = useSelector((state: number) => state.map.destinationLatitude);
  const destinationLongitude = useSelector((state: number) => state.map.destinationLongitude);
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  
  console.log(originLatitude, originLongitude, destinationLatitude, destinationLongitude);

  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({ map });

    setDirectionsService(service);
    setDirectionsRenderer(renderer);

    return () => {
      if (renderer) {
        renderer.setMap(null); 
      }
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !originLatitude || !destinationLatitude || !originLongitude || !destinationLongitude) return;

    console.log(originLatitude, originLongitude, destinationLatitude, destinationLongitude);
    directionsService
      .route({
        origin: { lat: parseFloat(originLatitude), lng: parseFloat(originLongitude) },
        destination: { lat: parseFloat(destinationLatitude), lng: parseFloat(destinationLongitude) },
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch(error => {
        console.error("Error fetching directions: ", error);
      });
    
  }, [directionsService, directionsRenderer, originLatitude, destinationLatitude, originLongitude, destinationLongitude]);

  useEffect(() => {
    if (!directionsRenderer || !routes.length) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer, routes]);

  if (!leg) return null;
  console.log(leg);
  console.log(leg.steps);
  console.log("Distance: ", leg.distance?.text);
  console.log("Distance: ", leg.distance?.value);
  dispatch(setDistance(leg.distance?.value));
  return (
    <>
    </>
  );
};