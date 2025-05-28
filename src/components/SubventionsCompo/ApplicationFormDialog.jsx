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

const ApplicationFormDialog = ({
  isOpen,
  onClose,
  onSave,
  applicationData,
  onSendToMission,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    agriculteur: "",
    typeSubvention: "",
    dateSoumission: "",
    statut: "En attente",
    titreFoncier: "",
    details: "",
  });
  const [terrainInfo, setTerrainInfo] = useState(null);
  const [titreFoncierSearch, setTitreFoncierSearch] = useState("");

  const resetForm = useCallback(() => {
    setFormData({
      agriculteur: "",
      typeSubvention: "",
      dateSoumission: "",
      statut: "En attente",
      titreFoncier: "",
      details: "",
    });
    setTerrainInfo(null);
    setTitreFoncierSearch("");
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (applicationData) {
        setFormData({
          agriculteur: applicationData.agriculteur || "",
          typeSubvention: applicationData.id_subvention || "",
          dateSoumission: applicationData.dateDepot || "",
          statut: applicationData.statusDemande || "En attente",
          titreFoncier: applicationData.numero_titre || "",
          details: applicationData.description || "",
        });
        setTerrainInfo(applicationData.terrainInfo || null);
        setTitreFoncierSearch(applicationData.titreFoncier || "");
      } else {
        resetForm();
      }
    }
  }, [applicationData, isOpen, resetForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitreFoncierSearchChange = (e) => {
    setTitreFoncierSearch(e.target.value);
  };

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
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const fetchedTerrainInfo = {
      titre: titreFoncierSearch,
      proprietaire: "Propriétaire Fictif",
      superficie: `${Math.floor(Math.random() * 20) + 1} Ha`,
      localisation: `Localisation Fictive ${Math.floor(Math.random() * 100)}`,
      typeSol: Math.random() > 0.5 ? "Sablo-limoneux" : "Argilo-calcaire",
      observations: "Terrain conforme aux normes (simulation).",
    };
    setTerrainInfo(fetchedTerrainInfo);
    setFormData((prev) => ({ ...prev, titreFoncier: titreFoncierSearch }));
    toast({
      title: "Informations trouvées",
      description: `Les informations pour ${titreFoncierSearch} ont été chargées.`,
    });
  };

  const resetTerrainSearchLocal = () => {
    setTitreFoncierSearch(applicationData?.titreFoncier || ""); // Reset to original if editing, else clear
    setTerrainInfo(applicationData?.terrainInfo || null);
  };

  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    onSave(formData, terrainInfo);
  };

  const handleMissionSend = () => {
    if (applicationData && applicationData.id) {
      onSendToMission(applicationData.id);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agriculteur">Agriculteur</Label>
              <Input
                id="agriculteur"
                name="agriculteur"
                value={formData.agriculteur}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="typeSubvention">Type de Subvention</Label>
              <Input
                id="typeSubvention"
                name="typeSubvention"
                value={formData.typeSubvention}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="dateSoumission">Date de Soumission</Label>
              <Input
                id="dateSoumission"
                name="dateSoumission"
                type="date"
                value={formData.dateSoumission ? new Date(formData.dateSoumission).toISOString().split("T")[0] : ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="statut">Statut</Label>
              <select
                id="statut"
                name="statut"
                value={formData.statut}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={
                  !!applicationData &&
                  (applicationData.statut === "Approuvée" ||
                    applicationData.statut === "Rejetée" ||
                    applicationData.statut === "Mission requise")
                }
              >
                <option value="En attente">En attente</option>
                <option value="En instruction">En instruction</option>
                <option value="Mission requise">Mission requise</option>
                <option value="Approuvée">Approuvée</option>
                <option value="Rejetée">Rejetée</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titreFoncierSearchDialog">
              Numéro de Titre Foncier
            </Label>
            <div className="flex space-x-2">
              <Input
                id="titreFoncierSearchDialog"
                value={formData.titreFoncier}
                onChange={handleTitreFoncierSearchChange}
                placeholder="Ex: TF12345"
              />
              <Button
                onClick={handleSearchTerrain}
                variant="secondary"
                type="button"
              >
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>

          {terrainInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="p-4 border rounded-md bg-muted/50 space-y-2"
            >
              <h4 className="font-semibold text-md flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Informations du Terrain (Titre: {terrainInfo.titre})
              </h4>
              <p className="text-sm">
                <span className="font-medium">Propriétaire:</span>{" "}
                {terrainInfo.proprietaire}
              </p>
              <p className="text-sm">
                <span className="font-medium">Superficie:</span>{" "}
                {terrainInfo.superficie}
              </p>
              <p className="text-sm">
                <span className="font-medium">Localisation:</span>{" "}
                {terrainInfo.localisation}
              </p>
              <p className="text-sm">
                <span className="font-medium">Type de Sol:</span>{" "}
                {terrainInfo.typeSol}
              </p>
              <p className="text-sm">
                <span className="font-medium">Observations:</span>{" "}
                {terrainInfo.observations}
              </p>
              <Button
                variant="link"
                size="sm"
                onClick={resetTerrainSearchLocal}
                className="text-destructive p-0 h-auto"
                type="button"
              >
                Effacer les informations
              </Button>
            </motion.div>
          )}

          <div>
            <Label htmlFor="details">Détails supplémentaires</Label>
            <Textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder="Ajoutez des notes ou détails importants ici..."
            />
          </div>
        </div>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Annuler
            </Button>
          </DialogClose>
          {applicationData &&
            applicationData.statut !== "Approuvée" &&
            applicationData.statut !== "Rejetée" &&
            applicationData.statut !== "Mission requise" && (
              <Button
                onClick={handleMissionSend}
                variant="secondary"
                type="button"
              >
                <Tractor className="h-4 w-4 mr-2" />
                Envoyer en Mission Terrain
              </Button>
            )}
          <Button onClick={handleSubmit} type="button">
            {applicationData ? "Enregistrer Modifications" : "Créer Demande"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationFormDialog;
