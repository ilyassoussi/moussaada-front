
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Camera,
  MapPin,
  Calendar,
  FileText,
  Send,
  Save,
  AlertCircle
} from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { toast } from './use-toast';
import {createGenerateRapport} from '../../services/apiTerrain';

const RapportForm = () => {
  const [formData, setFormData] = useState({
    demandeId: '',
    titreFoncier: '',
    nomTechnicien: '',
    dateVisite: '',
    region: '',
    commune: '',
    gpsLatitude: '',
    gpsLongitude: '',
    superficieReelleMesuree: '',
    typeSol: '',
    etatSol: '',
    cultureActuelle: '',
    systemeIrrigationExistant: '',
    besoinReel: '',
    localisation: '',
    superficie: '',
    coherenceDemande: '',
    rendementEstime: '',
    remarqueCoherence: '',
    devisJustifie: '',
    remarquesTechnicien: '',
    avis: '',
    justificationAvis: '',
    montantEstimeProjet: '',
    photos: []
  });


  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (action) => {
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append('demandeId', formData.demandeId);
    payload.append('agriculteur', formData.agriculteur);
    payload.append('dateVisite', formData.dateVisite);
    payload.append('typeVisite', formData.typeVisite);
    payload.append('localisation', formData.localisation);
    payload.append('structureAgricole', formData.structureAgricole);
    payload.append('superficie', formData.superficie);
    payload.append('typeCulture', formData.typeCulture);
    payload.append('rendementEstime', formData.rendementEstime);
    payload.append('problemesIdentifies', formData.problemesIdentifies);
    payload.append('materielsUtilises', formData.materielsUtilises);
    payload.append('personnelPresent', formData.personnelPresent);
    payload.append('observations', formData.observations);
    payload.append('recommandations', formData.recommandations);
    payload.append('conformite', formData.conformite);

    formData.photos.forEach((photo, index) => {
      payload.append('photos', photo);
    });

    try {
      const response = await createGenerateRapport(payload);

      if (response.code !== 201) {
        throw new Error('Erreur lors de la génération du rapport');
      }

      const result = await response.data;

      toast({
        title: action === 'save' ? 'Rapport sauvegardé' : 'Rapport généré avec succès',
        description: result.message || 'Votre rapport a été traité avec succès.',
        variant: 'success'
      });

      // Réinitialiser uniquement si c’est un envoi complet
      if (action !== 'save') {
        setFormData({
          demandeId: '',
          agriculteur: '',
          dateVisite: '',
          typeVisite: '',
          localisation: '',
          structureAgricole: '',
          superficie: '',
          typeCulture: '',
          rendementEstime: '',
          problemesIdentifies: '',
          materielsUtilises: '',
          personnelPresent: '',
          observations: '',
          recommandations: '',
          conformite: '',
          photos: []
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive'
      });
    }

    setIsSubmitting(false);
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Nouveau Rapport de Visite</h2>
            <p className="text-green-100">Remplissez les informations de votre visite terrain</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations Générales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Informations Générales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Demande
                </label>
                <Select value={formData.demandeId} onValueChange={(value) => handleInputChange('demandeId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une demande" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEM-2024-001">DEM-2024-001 - Mohamed Alami</SelectItem>
                    <SelectItem value="DEM-2024-002">DEM-2024-002 - Fatima Zahra</SelectItem>
                    <SelectItem value="DEM-2024-004">DEM-2024-004 - Aicha Benali</SelectItem>
                    <SelectItem value="DEM-2024-005">DEM-2024-005 - Omar Tazi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de Visite
                </label>
                <Input
                  type="date"
                  value={formData.dateVisite}
                  onChange={(e) => handleInputChange('dateVisite', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de Visite
                </label>
                <Select value={formData.typeVisite} onValueChange={(value) => handleInputChange('typeVisite', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de visite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="initiale">Visite Initiale</SelectItem>
                    <SelectItem value="suivi">Visite de Suivi</SelectItem>
                    <SelectItem value="controle">Visite de Contrôle</SelectItem>
                    <SelectItem value="finale">Visite Finale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Coordonnées GPS ou adresse"
                    value={formData.localisation}
                    onChange={(e) => handleInputChange('localisation', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Détails Complémentaires */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Compléments de Visite
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Structure Agricole
                </label>
                <Input
                  placeholder="Type de structure (ex : serre, champ ouvert...)"
                  value={formData.structureAgricole}
                  onChange={(e) => handleInputChange('structureAgricole', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Superficie (en ha)
                </label>
                <Input
                  type="number"
                  placeholder="Ex : 2.5"
                  value={formData.superficie}
                  onChange={(e) => handleInputChange('superficie', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de Culture
                </label>
                <Input
                  placeholder="Ex : Blé, Tomate, etc."
                  value={formData.typeCulture}
                  onChange={(e) => handleInputChange('typeCulture', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rendement Estimé (kg/ha)
                </label>
                <Input
                  type="number"
                  placeholder="Ex : 2500"
                  value={formData.rendementEstime}
                  onChange={(e) => handleInputChange('rendementEstime', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problèmes Identifiés
                </label>
                <Textarea
                  placeholder="Lister les problèmes observés sur le terrain..."
                  value={formData.problemesIdentifies}
                  onChange={(e) => handleInputChange('problemesIdentifies', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matériels Utilisés
                </label>
                <Textarea
                  placeholder="Liste des équipements/machines utilisés..."
                  value={formData.materielsUtilises}
                  onChange={(e) => handleInputChange('materielsUtilises', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personnel Présent
                </label>
                <Input
                  placeholder="Ex : Ingénieur agricole, technicien, ouvrier..."
                  value={formData.personnelPresent}
                  onChange={(e) => handleInputChange('personnelPresent', e.target.value)}
                />
              </div>
            </div>
          </div>


          {/* Observations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Observations de Terrain
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observations Détaillées
                </label>
                <Textarea
                  placeholder="Décrivez vos observations sur l'état des installations, la conformité aux normes, les conditions du terrain..."
                  value={formData.observations}
                  onChange={(e) => handleInputChange('observations', e.target.value)}
                  rows={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommandations
                </label>
                <Textarea
                  placeholder="Vos recommandations pour l'amélioration ou la mise en conformité..."
                  value={formData.recommandations}
                  onChange={(e) => handleInputChange('recommandations', e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Évaluation de Conformité
                </label>
                <Select value={formData.conformite} onValueChange={(value) => handleInputChange('conformite', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau de conformité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conforme">Conforme</SelectItem>
                    <SelectItem value="partiellement">Partiellement Conforme</SelectItem>
                    <SelectItem value="non_conforme">Non Conforme</SelectItem>
                    <SelectItem value="en_cours">En Cours d'Installation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-green-600" />
              Photos de la Visite
            </h3>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Cliquez pour ajouter des photos</p>
                  <p className="text-sm text-gray-400">PNG, JPG jusqu'à 10MB</p>
                </label>
              </div>

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      <p className="text-xs text-gray-500 mt-1 truncate">{photo.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>

            <div className="space-y-3">
              <Button
                onClick={() => handleSubmit('send')}
                disabled={isSubmitting}
                className="w-full agricultural-gradient hover:opacity-90"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Rapport'}
              </Button>

              <Button
                variant="outline"
                onClick={() => handleSubmit('save')}
                disabled={isSubmitting}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder en Brouillon
              </Button>
            </div>
          </div>

          {/* Aide */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Conseils</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Prenez des photos claires et détaillées</li>
                  <li>• Notez les coordonnées GPS précises</li>
                  <li>• Documentez tous les équipements</li>
                  <li>• Mentionnez les non-conformités</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes Statistiques</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rapports ce mois</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Visites planifiées</span>
                <span className="font-semibold text-blue-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taux de conformité</span>
                <span className="font-semibold text-yellow-600">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RapportForm;
