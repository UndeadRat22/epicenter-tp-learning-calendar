import Axios from 'axios';
import { BACKEND_API_URL } from './constants/URL';
import cookies from './cookies';

const setupAxios = () => {
  Axios.defaults.baseURL = `${BACKEND_API_URL}/api/`;
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

  Axios.interceptors.response.use(response => {
    if (response.config.refreshToken || !cookies.get('token'))
      return response;

    response.config.refreshToken = true;

    Axios.get('auth/refresh').then(refreshResponse => {
      const { token, expires } = refreshResponse.data;

      cookies.remove('token');

      const parsedExpires = new Date(Date.parse(expires));
      cookies.set('token', token, { path: '/', expires: parsedExpires, sameSite: true });
    });

    return response;
  });
};

export default setupAxios;
