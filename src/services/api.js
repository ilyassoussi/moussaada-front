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


export const CreateReclamation = async (id_ville,email,addresse,telephone_fixe,gsm,reclamation) => {
    try {
        const response = await axiosInstance.post(`/paysan/reclamation/create`,
            {
                id_ville,
                email,
                addresse,
                telephone_fixe,
                gsm,
                reclamation
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

export const getAllReclamation = async () => {
    try{
        const response = await axiosInstance.get(`/paysan/reclamation`);
        return response.data.data;
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}
export const getResponseReclamation = async (id) => {
    try{
        const response = await axiosInstance.get(`/admin/reclamation/response/${id}`)
        return response.data.data;
    } catch (error){
        throw error.response ? error.response.data : error;
    }
}


/**************************************demande subvention partie paysan *************************************************/

export const getAllSubventionNotExpiredYet = async () => {
    try{
        const response = await axiosInstance.get(`/paysan/demande/subvention/notexpired`);
        return response.data.data;
    } catch (error){
        throw error.response ? error.response.data : error;
    }
}


export const createDemandeSubvention = async (formData) => {
    try {
        const response = await axiosInstance.post(
            `/paysan/demande/create`,
            formData, // envoi direct du FormData
            {
                headers: {
                    // Ne PAS définir Content-Type ici, axios le gère automatiquement pour FormData
                    // Tu peux ajouter un token si nécessaire ici aussi
                    // 'Authorization': `Bearer ${token}` 
                },
            }
        );
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};



export const getAllMyDemandePaysan = async () => {
    try{
        const response = await axiosInstance.get(`/paysan/demande`);
        return response.data.data;
    } catch (error){
        throw error.response ? error.response.data : error;
    }
}

export const getResponseByDemandePaysan = async (id) => {
    try{
        const response = await axiosInstance.get(`/paysan/demande/traitement/${id}`);
        return response.data.data;
    } catch (error){
        throw error.response ? error.response.data : error;
    }
}