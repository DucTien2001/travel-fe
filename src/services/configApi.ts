import axios, { AxiosRequestConfig } from 'axios';
import { EKey } from 'models/general';

const api = axios.create({
  baseURL: `https://travel-be-nodejs.herokuapp.com`,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(EKey.TOKEN);
    if (token) (config.headers.common['Authorization'] as string) = `Bearer ${token}`;
    return config;
  }
);

export default api;

