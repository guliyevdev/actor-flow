import { useState } from 'react';
import styles from './map.module.scss';
import inputStyle from './phoneInput.module.scss';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Button } from 'antd';
import { useDispatch, } from 'react-redux';
import { updatePhoneNumber } from '../../redux/order/orderSlice';

interface Props {
    onNext: () => void;
}
  

const PhoneNumberInput = ({ onNext }: Props) => {
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();
    
    return (
        <div className={styles.mapSideIn}>
             <div className="">
                    <h2 className='text-2xl font-bold'>Telefon nömrəni daxil et</h2>
                </div>
            <div className={`mt-5 ${inputStyle.phoneInputWrapper}`}>
                <PhoneInput
                    defaultCountry="az"
                    value={phone}
                    className={inputStyle.phoneInput}
                    onChange={(phone) => setPhone(phone)}
                />
            </div>
            <Button 
                disabled={!(phone.length > 12)} 
                onClick={() => {
                    dispatch(updatePhoneNumber(phone));
                    onNext();
                }} 
                className='mt-4 p-5' 
                style={{ backgroundColor: 'black', color: 'white' }} 
                type="primary" 
                size='large'
            >
                Davam et
            </Button>
        </div>
    );
}

export default PhoneNumberInput