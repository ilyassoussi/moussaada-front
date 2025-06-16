import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '', 
});

// Ajouter automatiquement le token à chaque requête
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // ou sessionStorage.getItem...
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
