import axios from 'axios';

const getBaseUrl = () => {
  return `${window.location.protocol}//${window.location.hostname}:5000`;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl()
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403 && error.response.data === "Token invalidated") {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;