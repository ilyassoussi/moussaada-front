import axios from "axios";

const API_URL = "http://localhost:8888/utilisateur/auth/media";

export const getImage = async (filename) => {
    try {
        const response = await axios.get(`${API_URL}/images/${filename}`, {
            responseType: "blob" // Important pour charger une image/vidéo binaire
        });
        return URL.createObjectURL(response.data); // Tu peux ensuite créer une URL avec URL.createObjectURL()
    } catch (error) {
        throw error.response?.data || { message: "Erreur inconnue lors de la connexion" };
    }
};

export const getVideo = async (filename) => {
    try {
        const response = await axios.get(`${API_URL}/video/${filename}`, {
            responseType: "blob"
        });
        return URL.createObjectURL(response.data);
    } catch (error) {
        throw error.response?.data || { message: "Erreur inconnue lors de la connexion" };
    }
};
