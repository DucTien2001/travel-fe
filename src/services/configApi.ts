import axios, { AxiosRequestConfig } from 'axios';
import { EKey } from 'models/general';

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(EKey.TOKEN);
    if (token) (config.headers.common['Authorization'] as string) = `Bearer ${token}`;
    return config;
  }
);

export default api;

