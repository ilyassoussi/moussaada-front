import axiosInstance from "../hooks/axiosInstance";
import axios from "axios";


export const createAccount = async (identite,nometprenom,mail,mdp,phone,confirmation_mdp,date_de_naissance) => {
    try {
        const response = await axios.post('http://localhost:8888/utilisateur/auth/create', 
            {
                identite,
                nometprenom,
                mail,
                mdp,
                phone,
                confirmation_mdp,
                date_de_naissance
            },
            {
                headers: {
                'Content-Type': 'application/json',
                },
            }
            );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


export const ValidateNumber = async (idcompte, number) => {
    try {
    const response = await axios.post(
            `http://localhost:8888/utilisateur/auth/validate/account/${idcompte}`,number.toString(),
            {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getInformationCompte = async (id) => {
    try {
        const response = await axiosInstance.get(`/utilisateur/getbyid/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
