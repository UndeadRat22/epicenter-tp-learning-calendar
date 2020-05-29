import Axios from 'axios';
import { BACKEND_API_URL } from './constants/URL';
import cookies from './utils/cookies';
import FeatureToggles from './utils/FeatureToggles';

const BASE_URL = `${BACKEND_API_URL}/api/`;

const setupAxios = () => {
  Axios.defaults.baseURL = BASE_URL;
  Axios.defaults.headers.common['Content-Type'] = 'application/json';

  Axios.interceptors.request.use(
    config => {
      const newConfig = config;
      const token = cookies.get('token');
      newConfig.headers.common.Authorization = token && `Bearer ${token}`;
      return newConfig;
    },
    error => Promise.reject(error),
  );

  Axios.interceptors.response.use(async response => {
    const { config: { baseURL }, config: { url } } = response;

    if (baseURL !== BASE_URL || url === 'auth/refresh' || url === 'employees/self' || url === 'auth/login'
      || url === 'auth/password' || url === 'auth/register')
      return response;

    if (FeatureToggles.isOn('emulate-slow-internet'))
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 3000));

    Axios.get('auth/refresh').then(refreshResponse => {
      const { token, expires } = refreshResponse.data;
      const parsedExpires = new Date(Date.parse(expires));
      cookies.set('token', token, { path: '/', expires: parsedExpires, sameSite: true });
    });
    return response;
  });
};

export default setupAxios;
