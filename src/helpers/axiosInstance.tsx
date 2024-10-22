import { baseUrl } from '@/_config';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_URL_DEV || 'http://192.168.128.139:5000/api';
const axiosInstance = axios.create({
  baseURL: apiUrl, // Ensure the server is up and accessible
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      // Add the Bearer token to the headers
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => { 
    if (error.response) {
      // Server responded with a status outside the 2xx range
      if (error.response.status === 401) {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response from server:', error.request);
    } else {
      // Something else caused the error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
