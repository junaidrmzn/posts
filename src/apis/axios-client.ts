/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosError } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      localStorage.clear();
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
