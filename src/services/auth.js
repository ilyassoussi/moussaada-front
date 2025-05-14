import axios from "axios";

const API_URL = "http://localhost:8888/utilisateur/auth/login";

export const login = async (identite, mdp) => {
    try {
        const response = await axios.post(API_URL, {
            identite,
            mdp
        });

        return response.data; // contient généralement le token JWT ou l'objet user
    } catch (error) {
        throw error.response?.data || { message: "Erreur inconnue lors de la connexion" };
    }
};
