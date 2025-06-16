import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './dialog';
import { Button } from './button';
import { Input } from './input';
import { User, Calendar as CalendarIcon, Save, Info } from 'lucide-react';
import { toast } from './use-toast';

const ReponseTemporaireModal = ({ isOpen, onClose, onSave, demande }) => {
  const [nomTechnicien, setNomTechnicien] = useState('');
  const [dateSortie, setDateSortie] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNomTechnicien('');
      setDateSortie('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!nomTechnicien || !dateSortie) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez remplir le nom du technicien et la date de sortie.',
        variant: 'destructive',
      });
      return;
    }
    onSave({
      demandeId: demande.id_traitent_demande,
      nomTechnicien,
      dateSortie,
    });
    toast({
      title: 'Réponse Temporaire Enregistrée',
      description: `La réponse pour la demande ${demande.id} a été enregistrée.`,
      variant: 'success',
    });
  };

  if (!demande) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white nature-pattern p-0">
        <DialogHeader className="p-6 pb-4 agricultural-gradient text-white rounded-t-lg">
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Info className="w-7 h-7 mr-3" />
            Réponse Temporaire
          </DialogTitle>
          <DialogDescription className="text-green-100 pt-1">
            Planifier une visite pour la demande: <span className="font-semibold">{demande.id_demande_technique}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="nomTechnicien" className="text-sm font-medium text-gray-700 flex items-center">
              <User className="w-4 h-4 mr-2 text-green-600" />
              Nom du Technicien
            </label>
            <Input
              id="nomTechnicien"
              value={nomTechnicien}
              onChange={(e) => setNomTechnicien(e.target.value)}
              placeholder="Entrez le nom du technicien"
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="dateSortie" className="text-sm font-medium text-gray-700 flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-green-600" />
              Date de Sortie Prévue
            </label>
            <Input
              id="dateSortie"
              type="date"
              value={dateSortie}
              onChange={(e) => setDateSortie(e.target.value)}
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Ceci est une réponse temporaire. Un rapport complet sera requis après la visite.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="p-6 pt-4 bg-gray-50 rounded-b-lg">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="agricultural-gradient hover:opacity-90">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReponseTemporaireModal;