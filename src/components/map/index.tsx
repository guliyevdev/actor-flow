import { APIProvider, ControlPosition, Map } from '@vis.gl/react-google-maps';

import styles from './page.module.scss';
import { MapDirections } from './map-directions';

const API_KEY = 'AIzaSyD9JBkYu-uZAPoojnbSD_6ZNUm_SGkmpO4';
const MAP_IDS = [
    'bf51a910020fa25a',
    '49ae42fed52588c3',
    '3fec513989decfcd',
    '7a9e2ebecd32a903'
];

type AutocompleteMode = { id: string; label: string };

const autocompleteModes: Array<AutocompleteMode> = [
    { id: 'classic', label: 'Google Autocomplete Widget' },
    { id: 'custom', label: 'Custom Build' },
    { id: 'custom-hybrid', label: 'Custom w/ Select Widget' }
];

export const CustomMap = () => {
    return (
        <div className={styles.app}>
            <APIProvider apiKey={API_KEY}>
                <Map
                    mapId={MAP_IDS[2]}
                    defaultZoom={7}
                    defaultCenter={{ lat: 40.3, lng: 47 }}
                    style={{ height: '100%', border: '1px solid #0000005c' }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    <MapDirections />
                </Map>
            </APIProvider>
        </div>
    );
};