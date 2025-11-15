import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const axiosClient = axios.create({
    baseURL: apiUrl
})

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {   
    if (error.response?.status === 401) localStorage.removeItem('ACCESS_TOKEN');
    throw error;

});

export function getFirstName(fullName = '') {
    if (typeof fullName !== 'string') return '';

    const parts = fullName.trim().split(/\s+/); 
    return parts[0] || '';
  }

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  

export default axiosClient;