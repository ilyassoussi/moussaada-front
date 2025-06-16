import axiosInstance from "../hooks/axiosInstanceAdmin";
import i18n  from '../i18n';

export const logout = async () => {
    try {
        const response = await axiosInstance.post(`/utilisateur/logout`);
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

/************************************************************actualite ******************************************************************/

export const getAllActualites = async () => {
    const lang = i18n.language || 'fr';
    const response = await axiosInstance.get(`/admin/actualite/getall?lang=${lang}`);
    return response;
};

export const getActualitesWithoutLangId = async (id) => {
    const response = await axiosInstance.get(`/admin/actualite/withoutLang/${id}`);
    return response.data.data;
};

export const getActualiteById = async (id) => {
    const lang = i18n.language || 'fr';
    const response = await axiosInstance.get(`/admin/actualite/${id}?lang=${lang}`);
    return response.data.data;
};

export const getActualiteByTitre = async (titre) => {
    const response = await axiosInstance.get(`/admin/actualite/titre/${titre}`);
    return response.data.data;
};

export const createActualite = async (data) => {
    const formData = new FormData();
    formData.append("titreAr", data.titreAr);
    formData.append("titreFr", data.titreFr);
    formData.append("descriptionAr", data.descriptionAr);
    formData.append("descriptionFr", data.descriptionFr);
    formData.append("IsActive", data.isActive);
    if (data.image) {
        formData.append("image", data.image);
    }

    const response = await axiosInstance.post(`/admin/actualite/create`, formData);
    return response.data.data;
};


export const updateActualite = async (id, data) => {
    const formData = new FormData();
    formData.append("titreAr", data.titreAr);
    formData.append("titreFr", data.titreFr);
    formData.append("descriptionAr", data.descriptionAr);
    formData.append("descriptionFr", data.descriptionFr);
    formData.append("IsActive", data.isActive);
    if (data.image) {
        formData.append("image", data.image);
    }

    const response = await axiosInstance.put(`/admin/actualite/update/${id}`, formData);
    return response.data.data;
};


export const deleteActualite = async (id) => {
    const response = await axiosInstance.delete(`/admin/actualite/delete/${id}`);
    return response.data;
};


export const deleteAllActualites = async () => {
    const response = await axiosInstance.delete(`/admin/actualite/delete`);
    return response.data;
};

/***********************************************Formation ********************************************/

export const createFormation = async (formationData) => {
    const response = await axiosInstance.post("/admin/formations/create", formationData);
    return response.data;
};

export const getAllFormations = async () => {
    const lang = i18n.language || 'fr';
    const response = await axiosInstance.get(`/admin/formations?lang=${lang}`);
    return response.data;
};

export const deleteFormationById = async (id) => {
    const response = await axiosInstance.delete(`/admin/formations/delete/${id}`);
    return response.data;
};

/********************************************** Active Account ***************************************/

export const getAllComptes = async () => {
    const response = await axiosInstance.get("/admin/compte");
    return response.data;
};

export const getActiveComptes = async () => {
    const response = await axiosInstance.get("/admin/compte/active");
    return response.data;
};

export const getInactiveComptes = async () => {
    const response = await axiosInstance.get("/admin/compte/inactive");
    return response.data;
};

export const confirmCompte = async (id, isActive) => {
    const response = await axiosInstance.put(`/admin/compte/confimed/${id}`, isActive, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

/********************************************* Traitement Reclamtion **************************************/

export const getAllTraitements = async () => {
    const response = await axiosInstance.get("/admin/reclamation");
    return response.data;
};

export const createTraitement = async (id, traitementData) => {
    const response = await axiosInstance.post(`/admin/reclamation/create/${id}`, traitementData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const getTraitementById = async (id) => {
    const response = await axiosInstance.get(`/admin/reclamation/${id}`);
    return response.data;
};

export const getTraitementByReclamation = async (id) => {
    const response = await axiosInstance.get(`/admin/reclamation/response/${id}`);
    return response.data;
};
