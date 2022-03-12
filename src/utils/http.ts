import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3310/registration',
    headers: {
        'Content-type': 'application/json',
    },
});

export default api;
