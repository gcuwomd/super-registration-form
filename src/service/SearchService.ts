import http from '../utils/http';
import authHeader from './HeaderService';

class SearchService {
    api: string;

    constructor() {
        this.api = '/search';
    }

    searchByName(name: string): Promise<any> {
        return http.get(`${this.api}/name=${name}`, { headers: authHeader() });
    }

    searchByGender(gender: string): Promise<any> {
        return http.get(`${this.api}/gender=${gender}`, {
            headers: authHeader(),
        });
    }

    searchByAcademy(academy: string): Promise<any> {
        return http.get(`${this.api}/academy=${academy}`, {
            headers: authHeader(),
        });
    }

    searchByDormitory(dormitory: string): Promise<any> {
        return http.get(`${this.api}/dormitory=${dormitory}`, {
            headers: authHeader(),
        });
    }

    searchByFirstChoice(firstChoice: string): Promise<any> {
        return http.get(`${this.api}/firstChoice=${firstChoice}`, {
            headers: authHeader(),
        });
    }

    searchBySecondChoice(secondChoice: string): Promise<any> {
        return http.get(`${this.api}/secondChoice=${secondChoice}`, {
            headers: authHeader(),
        });
    }
}

export default new SearchService();
