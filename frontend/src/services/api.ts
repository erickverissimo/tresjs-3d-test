import Axios from 'axios';
import { useAuthStore } from '../stores';
import { BASE_API_URL } from '../config';

const options = {
  baseURL: BASE_API_URL || 'http://localhost:8000/api',
};

const api = Axios.create(options);

api.interceptors.request.use((config) => {
  const store = useAuthStore();
  const currentUser = store.currentUser;
  if (currentUser && currentUser.token) {
    config.headers = {
      Authorization: `Bearer ${currentUser.token}`,
    } as any;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const store = useAuthStore();
      store.logout();
    }
    return Promise.reject(error);
  },
);

export default api;
