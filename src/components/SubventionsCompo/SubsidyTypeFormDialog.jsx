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

    const SubsidyTypeFormDialog = ({ isOpen, onClose, onSave, subsidyTypeData }) => {
      const [formData, setFormData] = useState({
        nom: '',
        description: '',
        montantPlafond: '',
        criteres: '',
        estActif: true,
      });

      useEffect(() => {
        if (subsidyTypeData) {
          setFormData({
            nom: subsidyTypeData.nom,
            description: subsidyTypeData.description,
            montantPlafond: subsidyTypeData.montantPlafond.toString(),
            criteres: subsidyTypeData.criteres,
            estActif: subsidyTypeData.estActif,
          });
        } else {
          setFormData({ nom: '', description: '', montantPlafond: '', criteres: '', estActif: true });
        }
      }, [subsidyTypeData, isOpen]);

      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
      };
      
      const handleCheckboxChange = (checked) => {
        setFormData(prev => ({ ...prev, estActif: checked }));
      };

      const handleSaveClick = () => {
        onSave(formData);
      };

      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{subsidyTypeData ? 'Modifier' : 'Ajouter'} un Type de Subvention</DialogTitle>
              <DialogDescription>
                {subsidyTypeData ? 'Modifiez les détails de ce type de subvention.' : 'Remplissez les informations pour créer un nouveau type de subvention.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nom" className="text-right">Nom</Label>
                <Input id="nom" name="nom" value={formData.nom} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <TextareaComponent id="description" name="description" value={formData.description} onChange={handleInputChange} className="col-span-3" rows={3} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="montantPlafond" className="text-right">Plafond (DA)</Label>
                <Input id="montantPlafond" name="montantPlafond" type="number" value={formData.montantPlafond} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="criteres" className="text-right">Critères</Label>
                <TextareaComponent id="criteres" name="criteres" value={formData.criteres} onChange={handleInputChange} className="col-span-3" rows={3} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estActif" className="text-right">Actif</Label>
                <Checkbox id="estActif" name="estActif" checked={formData.estActif} onCheckedChange={handleCheckboxChange} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
              <Button onClick={handleSaveClick}>{subsidyTypeData ? 'Enregistrer Modifications' : 'Créer Subvention'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };

    export default SubsidyTypeFormDialog;