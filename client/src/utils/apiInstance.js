import axios from 'axios';
import { BASE_URL } from './config';
import { store } from '../redux/store';

const api = axios.create({
  baseURL: BASE_URL, 
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
