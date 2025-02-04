import { AutoCompleteCustom } from './auto-complete';
import styles from './map.module.scss';
import { useState } from 'react';

interface Props {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}



const SideMap = ({ onPlaceSelect }: Props) => {
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(step + 1);
      };
    return (
        <div className='autocomplete-control'>
            <div className={styles.mapSide}>
            <AutoCompleteCustom onPlaceSelect={onPlaceSelect} onNext={nextStep} />
            </div>
        </div>
    );
};

export default SideMap;