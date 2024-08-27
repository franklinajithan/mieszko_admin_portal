import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.128.126:5000/api/',
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure that 'Bearer ' or any other required prefix is added
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// for error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle the 401 error: Unauthorized
      localStorage.clear();
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
