import api from '../services/api';
import { useAuthStore } from '@/stores';

const isAuthenticated = async () => {
  const authStore = useAuthStore();
  if (!authStore.currentUser?.token) {
    authStore.$reset();
    return false;
  }
  const token = authStore.currentUser?.token;
  if (token) {
    try {
      api.interceptors.request.use((config) => {
        config.headers = {
          Authorization: `Bearer ${token}`,
        } as any;
        return config;
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};

export { isAuthenticated };
