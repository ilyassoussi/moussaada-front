import React, { useState, useEffect, useCallback } from "react";
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

const SubventionInformationDialogue = ({
  isOpen,
  onClose,
  subvention,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    categorie	: "",
    description	: "",
    montantMaximum	: "",
    pourcentageSubvention	: "En attente",
    dateDebut: "",
    dateFin: "",
    conditionsEligibilite: "",
    piecesRequises: "",
  });

  const resetForm = useCallback(() => {
    setFormData({
      categorie	: "",
      description	: "",
      montantMaximum	: "",
      pourcentageSubvention	: "",
      dateDebut: "",
      dateFin: "",
      conditionsEligibilite: "",
      piecesRequises: "",
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (subvention) {
        setFormData({
          categorie: subvention.categorie || "",
          description: subvention.description || "",
          montantMaximum: subvention.montantMaximum || "",
          pourcentageSubvention: subvention.pourcentageSubvention || "",
          dateDebut: subvention.dateDebut || "",
          dateFin: subvention.dateFin || "",
          conditionsEligibilite: subvention.conditionsEligibilite || "",
          piecesRequises: subvention.piecesRequises || "",
        });
      } else {
        resetForm();
      }
    }
  }, [subvention, isOpen, resetForm]);

  const handleDialogClose = () => {
    resetForm();
    onClose();
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
            {subvention ? "Modifier" : "Nouvelle"} Demande de Subvention
          </DialogTitle>
          <DialogDescription>
            {subvention
              ? "Modifiez les informations de la demande."
              : "Remplissez les informations pour créer une nouvelle demande."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categorie">Categories</Label>
              <Input
                id="categorie"
                name="categorie"
                value={formData.categorie}
                disable
              />
            </div>
            <div>
              <Label htmlFor="montantMaximum">Montant Maximum</Label>
              <Input
                id="montantMaximum"
                name="montantMaximum"
                value={formData.montantMaximum}
                disable
              />
            </div>
            <div>
              <Label htmlFor="dateDebut">Date de debut</Label>
              <Input
                id="dateDebut"
                name="dateDebut"
                type="date"
                value={formData.dateFin ? new Date(formData.dateDebut).toISOString().split("T")[0] : ""}
                disable
              />
            </div>
            <div>
              <Label htmlFor="dateDebut">Date de fin</Label>
              <Input
                id="dateFin"
                name="dateFin"
                type="date"
                value={formData.dateFin ? new Date(formData.dateFin).toISOString().split("T")[0] : ""}
                disable
              />
            </div>
            <div>
              <Label htmlFor="pourcentageSubvention">Pourcentage de Subvention (%)</Label>
              <Input
                id="pourcentageSubvention"
                name="pourcentageSubvention"
                type="text"
                disable
                value={formData.pourcentageSubvention}
              />
            </div>
            <div>
              <Label htmlFor="piecesRequises">Piece Requises</Label>
              <Input
                id="piecesRequises"
                name="piecesRequises"
                type="text"
                value={formData.piecesRequises}
                disable
              />
            </div>
          </div>

          <div>
            <Label htmlFor="conditionsEligibilite">Condition Eligibilite</Label>
            <Textarea
              id="conditionsEligibilite"
              name="conditionsEligibilite"
              value={formData.conditionsEligibilite}
              disable
            />
          </div>
        </div>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Annuler
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubventionInformationDialogue;
