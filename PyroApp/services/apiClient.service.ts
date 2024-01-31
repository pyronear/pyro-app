import axios from 'axios';
import {authService} from './auth.service';

const apiClient = axios.create({
  baseURL: 'https://apidev.pyronear.org',
  timeout: 5000,
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
});

apiClient.interceptors.request.use(
  async config => {
    const token = await authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode === 401 && (await authService.isLogged())) {
      await authService.removeToken();
      console.warn('Please login to access this resource');
    }
    return Promise.reject(error);
  },
);

export default apiClient;
