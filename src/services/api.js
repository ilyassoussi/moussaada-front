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


export const logout = async () => {
    try {
        const response = await axiosInstance.post(`/utilisateur/logout`);
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const CreateUpdateAddresse = async (id_ville,addresse,quartier,code_postal,email,telephone_fixe,gsm) => {
    try {
        const response = await axiosInstance.post(`/paysan/addresse/create`,
            {
                id_ville,
                addresse,
                quartier,
                code_postal,
                email,
                telephone_fixe,
                gsm
            },
            {
                headers: {
                'Content-Type': 'application/json',
                },
            }
        );
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getAddressePaysan = async () => {
    try{
        const response = await axiosInstance.get(`/paysan/addresse`);
        return response.data.data;
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}

export const GetVillePaysan = async () => {
    try {
        const response = await axiosInstance.get(`/paysan/addresse/ville`);
        return response.data.data;
    } catch (error){
        throw error.response ? error.response.data : error;
    }
}