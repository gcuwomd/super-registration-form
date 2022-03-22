import axios, { AxiosInstance } from 'axios';
import router from '../router';
import DialogBox from '../components/DialogBox';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3310/registration',
    headers: {
        'Content-type': 'application/json',
    },
});

// 请求拦截器
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         console.log(token);
//         if (token) {
//             config.headers.token = token;
//         }
//         console.log(config.headers);
//         return config;
//     },
//     (error) => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

// 响应拦截器
api.interceptors.response.use(
    // 2xx 内的状态码
    (response) => response,
    (error) => {
        // 2xx 外的状态码
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('account');

                DialogBox('登录状态已过期，请重新登录');
                setTimeout(() => {
                    router.push('/signin');
                }, 2100);
            }
        } else {
            DialogBox('网络连接错误，请稍后重试');
        }

        return Promise.reject(error);
    }
);

export default api;
