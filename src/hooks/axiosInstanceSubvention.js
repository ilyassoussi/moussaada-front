import axios from 'axios';

const axiosInstanceSubvention = axios.create({
    baseURL: 'http://localhost:8888', 
});

// Ajouter automatiquement le token à chaque requête
axiosInstanceSubvention.interceptors.request.use(config => {
    const token_subventions = localStorage.getItem('token-subventions'); // ou sessionStorage.getItem...
    if(token_subventions){
        config.headers.Authorization = `Bearer ${token_subventions}`;
    }
    return config;
});

export default axiosInstanceSubvention;
