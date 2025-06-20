import axios from 'axios';

const axiosInstanceAdmin= axios.create({
    baseURL: '', 
});

// Ajouter automatiquement le token à chaque requête
axiosInstanceAdmin.interceptors.request.use(config => {
    const tokenAdmin = localStorage.getItem('token-admin');
    if(tokenAdmin){
        config.headers.Authorization = `Bearer ${tokenAdmin}`;
    }
    return config;
});

export default axiosInstanceAdmin;
