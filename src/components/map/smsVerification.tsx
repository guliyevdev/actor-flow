import { useState } from 'react';
import styles from './map.module.scss';
import inputStyle from './phoneInput.module.scss';
import { Button, Input } from 'antd';
import apiClient from '../../utils/apiClient';
import { message } from 'antd';
import { useSelector } from 'react-redux';


const SmsVerification = () => {
    const truckCategory = useSelector((state: any) => state.MapDirections.truckCategory);
    const phoneNumber = useSelector((state: any) => state.MapDirections.phoneNumber);
    const [otp, setOtp] = useState('');
    const [ordered, setOrdered] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const handleChange = (e: any) => {
        const value = e.target.value.replace(/\D/g, '');
        setOtp(value);
    };
    const handleSubmit = () => {
        apiClient.post("/order/add", {
            orderNumber: "ORD" + Date.now().toString(),
            pickupLocation: "123 Main St, City, Country",
            dropoffLocation: "456 Elm St, City, Country",
            pickupDate: "2023-10-01T10:00:00.000Z",
            dropoffDate: "2023-10-02T18:00:00.000Z",
            status: "PENDING",
            priceId: 2,
            phoneNumber: phoneNumber,
            truckCategoryId: truckCategory,
            payment: 200
        }).then(response => {
            messageApi.open({
                type: 'success',
                content: 'Sifarişiniz qeydə alındı',
            });
            setOrdered(true);
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <>
            {contextHolder}
            <div className={styles.mapSideIn}>
                {ordered ? (
                    <div className="order-confirmation">
                        <h2 className='text-xl font-bold'>Sifarişniz qeydə alındə tezliklə sizinlə əlaqə saxlanılacaq</h2>
                    </div>
                ) : (
                    <>
                        <div className="">
                            <h2 className='text-2xl font-bold'>SMS kodu daxil et</h2>
                        </div>
                        <div className={`mt-5 ${inputStyle.phoneInputWrapper}`}>
                            <Input
                                value={otp}
                                onChange={handleChange}
                                maxLength={6}
                                placeholder="Enter OTP"
                                type="text" />
                        </div>
                        <Button onClick={handleSubmit} disabled={!(otp.length > 5)} className='mt-4 p-5' style={{ backgroundColor: 'black', color: 'white' }} type="primary" size='large'>Davam et</Button>
                    </>
                )}
            </div>
        </>
    );
}

export default SmsVerification