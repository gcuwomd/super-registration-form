import { AxiosRequestHeaders } from 'axios';

export default function authHeader(): AxiosRequestHeaders {
    const token = localStorage.getItem('token');

    if (token) {
        return { token };
    }

    return {};
}
