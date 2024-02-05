import axios from 'axios';
import { BASE_URL } from './config';
import { store } from '../redux/store';
import { logout } from '../redux/slice/auth.slice';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response ? error.response.status : null;

    if (statusCode === 401) {
      store.dispatch(logout());
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
