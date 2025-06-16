import axiosInstance from "../hooks/axiosInstanceTerrain";

export const logout = async () => {
    try {
        const response = await axiosInstance.post(`/utilisateur/logout`);
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getAllDemande = async () => {
    try {
        const response = await axiosInstance.get(`/terrain/response/alldemande`);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getAllresponse = async () => {
    try {
        const response = await axiosInstance.get(`/terrain/response`);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getDemandeById = async (id_demande_subvention) => {
    try {
        const response = await axiosInstance.get(
            `/terrain/response/demande-nontraite/${id_demande_subvention}`
        );
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getDemandeByIdReponse = async (id_reponse) => {
    try {
        const response = await axiosInstance.get(
            `/terrain/response/demande/by-idreponse/${id_reponse}`
        );
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getInfoTerre = async (titre_terre) => {
    try {
        const response = await axiosInstance.get(
            `/terrain/info/terre/numero-titre/${titre_terre}`
        );
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createresponse = async (
    id_traitement_subvention,
    nomTechnicien,
    titre,
    commentaire,
    date_de_sortie
) => {
  try {
    const formData = new FormData();
    formData.append('id_traitement_subvention', id_traitement_subvention);
    formData.append('nomTechnicien', nomTechnicien);
    formData.append('titre', titre);
    formData.append('commentaire', commentaire);
    formData.append('date_de_sortie', date_de_sortie);

    const response = await axiosInstance.post(`/terrain/response/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


/************************************** info terre ********************************************************/
export const getInfoDemandePaysan = async (id_demande_paysan) => {
    try {
        const response = await axiosInstance.get(
            `/terrain/response/info-demande/${id_demande_paysan}`
        );
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

/****************************************************************** Creation de Rapport *******************************************************/
export const getAllRapport = async () => {
    try {
        const response = await axiosInstance.get(`/terrain/response/get-rapport`);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createGenerateRapport = async (
    id_reponse,
    titreFoncier,
    nomTechnicien,
    dateVisite,
    region,
    commune,
    gpsLatitude,
    gpsLongitude,
    superficieReelleMesuree,
    typeSol,
    etatSol,
    cultureActuelle,
    systemeIrrigationExistant,
    besoinReel,
    photosTerrain,
    coherenceDemande,
    remarqueCoherence,
    devisJustifie,
    remarquesTechnicien,
    avis,
    justificationAvis,
    montantEstimeProjet
) => {
    try {
        const formData = new FormData();
        formData.append("id_reponse", id_reponse);
        formData.append("titreFoncier", titreFoncier);
        formData.append("nomTechnicien", nomTechnicien);
        formData.append("dateVisite", dateVisite);
        formData.append("region", region);
        formData.append("commune", commune);
        formData.append("gpsLatitude", gpsLatitude);
        formData.append("gpsLongitude", gpsLongitude);
        formData.append("superficieReelleMesuree", superficieReelleMesuree);
        formData.append("typeSol", typeSol);
        formData.append("etatSol", etatSol);
        formData.append("cultureActuelle", cultureActuelle);
        formData.append("systemeIrrigationExistant", systemeIrrigationExistant);
        formData.append("besoinReel", besoinReel);

        if (photosTerrain && photosTerrain.length > 0) {
            for (let i = 0; i < photosTerrain.length; i++) {
                formData.append("photosTerrain", photosTerrain[i]);
            }
        }

        formData.append("coherenceDemande", coherenceDemande);
        if (remarqueCoherence)
            formData.append("remarqueCoherence", remarqueCoherence);
        formData.append("devisJustifie", devisJustifie);
        if (remarquesTechnicien)
            formData.append("remarquesTechnicien", remarquesTechnicien);
        formData.append("avis", avis);
        formData.append("justificationAvis", justificationAvis);
        if (montantEstimeProjet !== undefined && montantEstimeProjet !== null) {
            formData.append("montantEstimeProjet", montantEstimeProjet);
        }

        const response = await axiosInstance.post(
            "/terrain/rapport/generate",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data; // C'est le fichier PDF (Blob)
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
