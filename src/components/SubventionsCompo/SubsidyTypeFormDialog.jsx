import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { Checkbox } from './checkbox';
import { cn } from '../lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/PaysanCompo/select";
import { Award } from "lucide-react";


const TextareaComponent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
TextareaComponent.displayName = 'TextareaComponent';

const SubsidyTypeFormDialog = ({ isOpen, onClose, onSave, subsidyTypeData , categories }) => {
  const [formData, setFormData] = useState({
    categorie: subsidyTypeData?.categorie || "",
    description: subsidyTypeData?.description || "",
    montantMaximum: subsidyTypeData?.montantMaximum || "",
    pourcentageSubvention: subsidyTypeData?.pourcentageSubvention || "",
    dateDebut: subsidyTypeData?.dateDebut || "",
    dateFin: subsidyTypeData?.dateFin || "",
    conditionsEligibilite: subsidyTypeData?.conditionsEligibilite || "",
    piecesRequises: subsidyTypeData?.piecesRequises || [],
    id_region: subsidyTypeData?.id_region || [],
  });

  useEffect(() => {
    if (subsidyTypeData) {
      setFormData({
        ...subsidyTypeData,
        montantMaximum: subsidyTypeData.montantMaximum?.toString() || '',
        pourcentageSubvention: subsidyTypeData.pourcentageSubvention?.toString() || '',
        piecesRequises: Array.isArray(subsidyTypeData.piecesRequises)
          ? subsidyTypeData.piecesRequises.join(', ')
          : '',
        id_region: Array.isArray(subsidyTypeData.id_region)
          ? subsidyTypeData.id_region.join(', ')
          : '',
      });
    } else {
      setFormData({
        categorie: '',
        description: '',
        montantMaximum: '',
        pourcentageSubvention: '',
        dateDebut: '',
        dateFin: '',
        conditionsEligibilite: '',
        piecesRequises: '',
        id_region: '',
        estActif: true,
      });
    }
  }, [subsidyTypeData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategorieChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      categorie: value,
    }));
  };
  
  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, estActif: checked }));
  };

  const handleSaveClick = () => {
    const payload = {
      ...formData,
      montantMaximum: parseFloat(formData.montantMaximum),
      pourcentageSubvention: parseFloat(formData.pourcentageSubvention),
      piecesRequises: formData.piecesRequises
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean),
      id_region: formData.id_region
        .split(',')
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id)),
    };
    onSave(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {subsidyTypeData ? 'Modifier' : 'Ajouter'} un Type de Subvention
          </DialogTitle>
          <DialogDescription>
            {subsidyTypeData
              ? 'Modifiez les détails de ce type de subvention.'
              : 'Remplissez les informations pour créer un nouveau type de subvention.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center">
                <Label htmlFor="categorie" className="text-foreground/80 flex items-center gap-2">
                  <Award size={16} /> Catégorie <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={handleCategorieChange} value={formData.categorie} name="categorie" required>
                  <SelectTrigger id="categorie" className="h-11 bg-background/70 w-90 border-border focus:border-primary transition-colors">
                    <SelectValue placeholder="-- Sélectionner une catégorie --" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categories).map(([value, label]) => (
                      <SelectItem key={value} value={String(value)}>
                          {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <TextareaComponent
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="col-span-3"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="montantMaximum" className="text-right">
              Montant Maximum
            </Label>
            <Input
              id="montantMaximum"
              name="montantMaximum"
              type="number"
              value={formData.montantMaximum}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pourcentageSubvention" className="text-right">
              Pourcentage Subvention
            </Label>
            <Input
              id="pourcentageSubvention"
              name="pourcentageSubvention"
              type="number"
              value={formData.pourcentageSubvention}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateDebut" className="text-right">
              Date Début
            </Label>
            <Input
              id="dateDebut"
              name="dateDebut"
              type="date"
              value={formData.dateDebut}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateFin" className="text-right">
              Date Fin
            </Label>
            <Input
              id="dateFin"
              name="dateFin"
              type="date"
              value={formData.dateFin}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="conditionsEligibilite" className="text-right">
              Conditions d'Éligibilité
            </Label>
            <TextareaComponent
              id="conditionsEligibilite"
              name="conditionsEligibilite"
              value={formData.conditionsEligibilite}
              onChange={handleInputChange}
              className="col-span-3"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="piecesRequises" className="text-right">
              Pièces Requises
            </Label>
            <Input
              id="piecesRequises"
              name="piecesRequises"
              value={formData.piecesRequises}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Ex: carte d'identité, justificatif"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id_region" className="text-right">
              ID Région(s)
            </Label>
            <Input
              id="id_region"
              name="id_region"
              value={formData.id_region}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Ex: 1, 2"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estActif" className="text-right">
              Actif
            </Label>
            <Checkbox
              id="estActif"
              name="estActif"
              checked={true}
              onCheckedChange={handleCheckboxChange}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button onClick={handleSaveClick}>
            {subsidyTypeData ? 'Enregistrer Modifications' : 'Créer Subvention'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubsidyTypeFormDialog;
