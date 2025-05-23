import axiosInstance from "../hooks/axiosInstanceSubvention";


export const createSubventions = async (categorie,description,montantMaximum,pourcentageSubvention,dateDebut,dateFin,conditionsEligibilite,piecesRequises,id_region) => {
    try {
        const response = await axiosInstance.post('http://localhost:8888/subvention/create', 
            {
                categorie,
                description,
                montantMaximum,
                pourcentageSubvention,
                dateDebut,
                dateFin,
                conditionsEligibilite,
                piecesRequises,
                id_region
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


export const getAllSubventions = async () => {
    try {
        const response = await axiosInstance.get('/subvention/getall');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


export const getAllSubventionsById = async (id) => {
    try {
        const response = await axiosInstance.get(`/subvention/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateSuvbention = async (id,data) => {
    try {
        const response = await axiosInstance.put(`/subvention/update/${id}`,data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const DeleteSubventions = async (id) => {
    try {
        const response = await axiosInstance.delete(`/subvention/delete/${id}`);
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