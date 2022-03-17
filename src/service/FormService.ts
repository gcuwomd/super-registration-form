import http from '../utils/http';
import authHeader from './HeaderService';
import IForm from '../types/Form';

class FormService {
    api: string;

    constructor() {
        this.api = '/form';
    }

    getAll(): Promise<any> {
        return http.get(this.api, { headers: authHeader() });
    }

    get(account: string): Promise<any> {
        return http.get(`${this.api}/${account}`, { headers: authHeader() });
    }

    submit(data: IForm): Promise<any> {
        return http.post(this.api, data);
    }
}

export default new FormService();
