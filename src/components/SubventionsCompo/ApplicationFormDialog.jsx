import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { useToast } from "./use-toast";
import { Search, MapPin, Tractor } from "lucide-react";
import { TraitementDemande,getInfoTerre , demandeTechnique } from "../../services/apiSubvention";

const ApplicationFormDialog = ({
  isOpen,
  onClose,
  onSave,
  applicationData,
  onSendToMission,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id_demande: "",
    typeSubvention: "",
    dateSoumission: "",
    statut: "En attente",
    titreFoncier: "",
  });

  const [formDataEnvo, setformDataEnvo] = useState({
    statut: "EN_ATTENTE",
    description: "",
    montantSubvention: "",
    nombre_de_plan: "",
  });

  const [terrainInfo, setTerrainInfo] = useState(null);
  const [titreFoncierSearch, setTitreFoncierSearch] = useState("");
  const [missionData, setMissionData] = useState({
    id_traitent_demande: "",
    titre: "",
    numero_terre: "",
    suvbention_demande: "",
    description: "",
  });

  const resetForm = useCallback(() => {
    setFormData({
      id_demande: "",
      typeSubvention: "",
      dateSoumission: "",
      statut: "EN_ATTENTE",
      titreFoncier: "",
    });
    setformDataEnvo({
      statut: "EN_ATTENTE",
      description: "",
      montantSubvention: "",
      nombre_de_plan: "",
    });
    setMissionData({
      id_traitent_demande: "",
      titre: "",
      numero_terre: "",
      suvbention_demande: "",
      description: "",
    });
    setTerrainInfo(null);
    setTitreFoncierSearch("");
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (applicationData) {
        setFormData({
          id_demande: applicationData.id_demande || "",
          typeSubvention: applicationData.id_subvention || "",
          dateSoumission: applicationData.dateDepot || "",
          statut: applicationData.statusDemande || "EN_ATTENTE",
          titreFoncier: applicationData.numero_titre || "",
        });
        setTerrainInfo(applicationData.terrainInfo || null);
        setTitreFoncierSearch(applicationData.numero_titre || "");
      } else {
        resetForm();
      }
    }
  }, [applicationData, isOpen, resetForm]);

  const handleSearchTerrain = async () => {
    if (!titreFoncierSearch) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un numéro de titre foncier.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Recherche en cours...",
      description: `Recherche des informations pour le titre ${titreFoncierSearch}.`,
    });

    try {
      const fetchedTerrainInfo = await getInfoTerre(titreFoncierSearch);
      setTerrainInfo(fetchedTerrainInfo);
      setFormData((prev) => ({
        ...prev,
        titreFoncier: titreFoncierSearch,
      }));

      toast({
        title: "Informations trouvées",
        description: `Les informations pour ${titreFoncierSearch} ont été chargées.`,
      });
    } catch (error) {
      toast({
        title: "Erreur lors de la récupération",
        description: error?.message || "Aucune information trouvée pour ce numéro.",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (applicationData && applicationData.id_demande) {
      try {
        await TraitementDemande(
          formData.id_demande,
          formDataEnvo.statut,
          formDataEnvo.description,
          formDataEnvo.montantSubvention,
          formDataEnvo.nombre_de_plan
        );

        // Si statut = EN_ATTENTE_EVALUATION_TERRAIN => on crée la mission technique
        if (formDataEnvo.statut === "EN_ATTENTE_EVALUATION_TERRAIN") {
            const missionPayload = {
              ...missionData,
              numero_terre: titreFoncierSearch,
            };
          if (!missionPayload.numero_terre || !missionPayload.suvbention_demande || !missionPayload.titre) {
            toast({
              title: "Erreur",
              description: "Veuillez remplir le numero de titre , type subvention demande et le titre de la mission.",
              variant: "destructive",
            });
            return;
          }

          try {
            await demandeTechnique(
              formData.id_demande,
              missionPayload.titre,
              missionPayload.numero_terre,
              missionPayload.suvbention_demande,
              missionPayload.description,
            );

            toast({
              title: "Mission technique créée",
              description: "La mission terrain a été créée avec succès.",
            });
          } catch (error) {
            toast({
              title: "Erreur Mission",
              description: error.message || "Erreur lors de la création de la mission.",
              variant: "destructive",
            });
            return; // Stopper ici si la mission échoue
          }
        }
        toast({
          title: "Succès",
          description: "La demande a été traitée avec succès.",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast({
          title: "Erreur",
          description:
            error.message || "Une erreur est survenue lors du traitement.",
          variant: "destructive",
        });
      }
    } else {
      onSave(formData, terrainInfo);
    }
  };

  const handleMissionSend = () => {
    if (applicationData && applicationData.id) {
      onSendToMission(applicationData.id, missionData);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(openState) => {
        if (!openState) handleDialogClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {applicationData ? "Modifier" : "Nouvelle"} Demande de Subvention
          </DialogTitle>
          <DialogDescription>
            {applicationData
              ? "Modifiez les informations de la demande."
              : "Remplissez les informations pour créer une nouvelle demande."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Subvention Infos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="typeSubvention">Type de Subvention</Label>
              <Input id="typeSubvention" value={formData.typeSubvention} disabled />
            </div>
            <div>
              <Label htmlFor="dateSoumission">Date de Soumission</Label>
              <Input
                id="dateSoumission"
                type="date"
                value={
                  formData.dateSoumission
                    ? new Date(formData.dateSoumission).toISOString().split("T")[0]
                    : ""
                }
                disabled
              />
            </div>
          </div>

          {/* Titre Foncier */}
          <div className="space-y-2">
            <Label htmlFor="titreFoncierSearchDialog">Numéro de Titre Foncier</Label>
            <div className="flex space-x-2">
              <Input
                id="titreFoncierSearchDialog"
                value={titreFoncierSearch}
                onChange={(e) => setTitreFoncierSearch(e.target.value)}
                placeholder="Ex: TF-123456"
                disabled
              />
              <Button onClick={handleSearchTerrain} variant="secondary" type="button">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>

          {/* Terrain Info */}
          {terrainInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="p-4 border rounded-md bg-muted/50 space-y-2"
            >
              <h4 className="font-semibold text-md flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Informations du Terrain (Titre: {terrainInfo.numeroTitre})
              </h4>
              <p className="text-sm"><strong>Propriétaire :</strong> {terrainInfo.proprietaires.nomComplet}</p>
              <p className="text-sm"><strong>Superficie :</strong> {terrainInfo.superficieM2}</p>
              <p className="text-sm"><strong>Localisation :</strong> {terrainInfo.localisation}</p>
              <p className="text-sm"><strong>En Litige :</strong> {terrainInfo.enLitige ? "OUI" : "NON"}</p>
              <p className="text-sm"><strong>hypothèque :</strong> {terrainInfo.hypothequee ? "OUI" : "NON"}</p>
            </motion.div>
          )}

          {/* Champs Envoi */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="montantSubvention">Montant de subvention</Label>
              <Input
                id="montantSubvention"
                type="number"
                value={formDataEnvo.montantSubvention}
                onChange={(e) =>
                  setformDataEnvo((prev) => ({
                    ...prev,
                    montantSubvention: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="nombre_de_plan">Nombre de plan</Label>
              <Input
                id="nombre_de_plan"
                type="number"
                value={formDataEnvo.nombre_de_plan}
                onChange={(e) =>
                  setformDataEnvo((prev) => ({
                    ...prev,
                    nombre_de_plan: e.target.value,
                  }))
                }
              />
            </div>
          </div> */}

          <div>
            <Label htmlFor="statut">Statut</Label>
            <select
              id="statut"
              value={formDataEnvo.statut}
              onChange={(e) =>
                setformDataEnvo((prev) => ({ ...prev, statut: e.target.value }))
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="EN_ATTENTE">En attente</option>
              <option value="EN_COURS_ETUDE">En instruction</option>
              <option value="EN_ATTENTE_EVALUATION_TERRAIN">Mission terrain</option>
              <option value="VALIDEE">Approuvée</option>
              <option value="REFUSEE">Rejetée</option>
            </select>
          </div>
        {/* Champs Envoi visibles uniquement si statut == VALIDEE ou REFUSEE */}
        {["VALIDEE", "REFUSEE" ,"EN_COURS_ETUDE" , "EN_ATTENTE"].includes(formDataEnvo.statut) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="montantSubvention">Montant de subvention</Label>
                <Input
                  id="montantSubvention"
                  type="number"
                  value={formDataEnvo.montantSubvention}
                  onChange={(e) =>
                    setformDataEnvo((prev) => ({
                      ...prev,
                      montantSubvention: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="nombre_de_plan">Nombre de plan</Label>
                <Input
                  id="nombre_de_plan"
                  type="number"
                  value={formDataEnvo.nombre_de_plan}
                  onChange={(e) =>
                    setformDataEnvo((prev) => ({
                      ...prev,
                      nombre_de_plan: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formDataEnvo.description}
                onChange={(e) =>
                  setformDataEnvo((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Ajoutez des notes ou détails importants ici..."
              />
            </div>
          </>
        )}

          {/* Champs spécifiques pour Mission Terrain */}
          {formDataEnvo.statut === "EN_ATTENTE_EVALUATION_TERRAIN" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <Label>ID Traitement Demande</Label>
                <Input
                  value={formData.id_demande}
                  onChange={(e) =>
                    setMissionData((prev) => ({
                      ...prev,
                      id_traitent_demande: e.target.value,
                    }))
                  }
                  disabled
                />
              </div>
              <div>
                <Label>Titre Mission</Label>
                <Input
                  value={missionData.titre}
                  onChange={(e) =>
                    setMissionData((prev) => ({ ...prev, titre: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Numero de terre</Label>
                <Input
                  value={titreFoncierSearch}
                  onChange={(e) =>
                    setMissionData((prev) => ({ ...prev, numero_terre: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Subvention demande</Label>
                <Input
                  value={missionData.suvbention_demande}
                  onChange={(e) =>
                    setMissionData((prev) => ({ ...prev, suvbention_demande: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Description Mission</Label>
                <Textarea
                  value={missionData.description}
                  onChange={(e) =>
                    setMissionData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </motion.div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button">Annuler</Button>
          </DialogClose>

          {formDataEnvo.statut === "EN_ATTENTE_EVALUATION_TERRAIN" && (
            <Button
              onClick={handleSubmit}
              variant="secondary"
              type="button"
            >
              <Tractor className="h-4 w-4 mr-2" />
              Envoyer en Mission Terrain
            </Button>
          )}
        {["VALIDEE", "REFUSEE" ,"EN_COURS_ETUDE" , "EN_ATTENTE"].includes(formDataEnvo.statut) && (
          <Button onClick={handleSubmit} type="button">
            Enregistre
          </Button>
        )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationFormDialog;
