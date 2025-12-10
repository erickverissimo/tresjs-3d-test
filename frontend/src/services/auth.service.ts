import api from './api';
import router from '../router';
import { ILoginRequest } from '@/types';

const baseURL = '/auth';

class AuthService {
  async logout() {
    router.push('/login');
  }

  async login(loginData: ILoginRequest) {
    return api.post(`${baseURL}/login`, loginData).then((response) => {
      return response.data;
    });
  }
  async getMe(): Promise<any> {
    return api.get(`${baseURL}/me`).then((response) => {
      return response.data;
    });
  }
}

export const authService = new AuthService();
