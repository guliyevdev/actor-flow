import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/main', 
    // timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default apiClient