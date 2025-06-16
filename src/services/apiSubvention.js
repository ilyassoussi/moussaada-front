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
        return response.data.data;
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

export const TraitementDemande = async (id_demande,status,description,montantSubvention,nombre_de_plan) => {
    try {
        const response = await axiosInstance.post(`/subvention/traitement/create`,
            {
                id_demande,
                status,
                description,
                montantSubvention,
                nombre_de_plan
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

// export const updateTraitement = async (id,id_demande,status,description,montantSubvention,nombre_de_plan) => {
//     try {
//         const response = await axiosInstance.put(`/paysan/update/${id}`,
//             {
//                 id_demande,
//                 status,
//                 description,
//                 montantSubvention,
//                 nombre_de_plan
//             },
//             {
//                 headers: {
//                 'Content-Type': 'application/json',
//                 },
//             }
//         );
//         return response;
//     } catch (error) {
//         throw error.response ? error.response.data : error;
//     }
// }

export const getAllDemandeNoTraitment = async () => {
    try{
        const response = await axiosInstance.get(`/subvention/traitement/info-demande`);
        return response.data.data;
    } catch (error){
        throw error.response ? error.response.data : error;
    }
}

export const getInfoTerre = async (numero_titre) => {
    try{
        const response = await axiosInstance.get(`/subvention/info/terre/numero-titre/${numero_titre}`);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getInfoDemandeByIddemande = async (id) => {
    try{
        const response = await axiosInstance.get(`/subvention/traitement/info-demande/${id}`);
        return response.data;
    } catch (error) {
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




/***********************************************************Mission Technique *************************************************************/


export const demandeTechnique = async (id_traitent_demande,titre,numero_terre,suvbention_demande,description) => {

    try {
        const response = await axiosInstance.post(`/subvention/demande-technique/create`,
            {
                id_traitent_demande,
                titre,
                numero_terre,
                suvbention_demande,
                description,
            },
            {
                headers: {
                'Content-Type': 'application/json',
                },
            }
        );
        return response.data.data
    } catch(error) {
        throw error.response ? error.response.data : error;
    }

}


export const AlldemandeTechnique = async () => {
    try {
        const response = await axiosInstance.get(`/subvention/demande-technique`);
        return response.data.data
    }catch(error){
        throw error.response ? error.response.data : error;
    }
}

export const EnCoursdemandeTechnique = async () => {

    try {
        const response = await axiosInstance.get(`/subvention/demande-technique/en-cours`,
            {
                headers: {
                'Content-Type': 'application/json',
                },
            }
        );
        return response.data.data
    }catch(error){
        throw error.response ? error.response.data : error;
    }

}


export const demandeTechniqueById = async (id) => {

    try {
        const response = await axiosInstance.get(`/subvention/demande-technique/${id}`,
            {
                headers: {
                'Content-Type': 'application/json',
                },
            }
        );
        return response.data.data
    }catch(error){
        throw error.response ? error.response.data : error;
    }

}


export const DeletedemandeTechniqueById = async (id) => {

    try {
        const response = await axiosInstance.delete(`/subvention/demande-technique/delete/${id}`,
            {
                headers: {
                'Content-Type': 'application/json',
                },
            }
        );
        return response.data
    }catch(error){
        throw error.response ? error.response.data : error;
    }
}

export const ReponsedemandeTechnique = async (id) => {
    try {
        const response = await axiosInstance.get(`/subvention/demande-technique/reponse/${id}`);
        return response.data.data
    } catch(error) {
        throw error.response ? error.response.data : error;
    }
}

export const AllRapport = async () => {
    try {
        const reponse = await axiosInstance.get(`/subvention/demande-technique/reponse/get-rapport`);
        return reponse.data.data;
    } catch(error){
        throw error.response ? error.response.data : error;    
    }
} 

export const validateRapport = async (idRapport) => {
    try {
        await axiosInstance.post(`/subvention/demande-technique/vaildate-rapport/${idRapport}`);
    } catch(error){
        throw error.response ? error.response.data : error;    
    }
} 