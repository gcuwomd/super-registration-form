import http from '../utils/http';
import authHeader from './HeaderService';
import IForm from '../types/Form';

class FormService {
    api: string;

    constructor() {
        this.api = '/form';
    }

    check(): Promise<any> {
        return http.get(`${this.api}/check`);
    }

    getAll(): Promise<any> {
        return http.get(this.api, { headers: authHeader() });
    }

    get(id: string): Promise<any> {
        return http.get(`${this.api}/${id}`, { headers: authHeader() });
    }

    submit(data: IForm): Promise<any> {
        return http.post(this.api, data);
    }

    downloadCsv(): Promise<any> {
        return http.get(`${this.api}/csv`, {
            headers: authHeader(),
            responseType: 'blob',
        });
    }
}

export default new FormService();
