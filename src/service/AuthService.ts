import http from '../utils/http';
import IUser from '../types/User';

class AuthService {
    signin: string;

    signup: string;

    constructor() {
        this.signin = '/signin';
        this.signup = '/signup';
    }

    login(user: IUser): Promise<any> {
        return http.post(this.signin, {
            account: user.account,
            password: user.password,
        });
    }

    register(user: IUser): Promise<any> {
        return http.post(this.signup, {
            account: user.account,
            name: user.name,
            password: user.password,
        });
    }
}

export default new AuthService();
