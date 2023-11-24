/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import {authService} from './services/auth.service';

axios.defaults.baseURL = 'https://apidev.pyronear.org';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(
  async config => {
    const token = await authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => response,
  async error => {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode == 401 && authService.isLogged()) {
      await authService.removeToken();
      console.warn('Please login to access this resource');
    }
    return Promise.reject(error);
  },
);

AppRegistry.registerComponent(appName, () => App);
