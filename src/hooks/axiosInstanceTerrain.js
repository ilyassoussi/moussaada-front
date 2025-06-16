import axios from 'axios';

const axiosInstanceTerrain= axios.create({
    baseURL: 'http://localhost:8888', 
});

// Ajouter automatiquement le token à chaque requête
axiosInstanceTerrain.interceptors.request.use(config => {
    const token_terrain = localStorage.getItem('token-terrain'); // ou sessionStorage.getItem...
    if(token_terrain){
        config.headers.Authorization = `Bearer ${token_terrain}`;
    }
    return config;
});

export default axiosInstanceTerrain;
