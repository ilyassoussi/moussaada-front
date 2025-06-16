import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Camera,
  MapPin,
  Calendar,
  FileText,
  Send,
  Save,
  AlertCircle,
  ArrowLeft,
  Maximize,
  Droplets,
  Edit2,
  ClipboardList
} from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { toast } from './use-toast';
import { getDemandeByIdReponse, getInfoTerre, createGenerateRapport } from '../../services/apiTerrain';

const RapportForm = ({ reponseAssociee, onBackToList }) => {
  const initialFormData = {
    id_response: '',
    agriculteur: '',
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [terrainsInfo, setTerrainsInfo] = useState({});
  const [error, setError] = useState(null);
  const [reponseData, setReponseData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTerrainsInfo = async (demandes) => {
    const infoMap = {};

    try {
      const info = await getInfoTerre(demandes.numero_terre);
      infoMap[demandes.numero_terre] = info;

    } catch (err) {
      console.error(`Erreur pour la terre ${demandes.numero_terre}`, err);
    }

    setTerrainsInfo(infoMap);
  };

  useEffect(() => {
    const fetchReponseAndTerrain = async () => {
      if (!reponseAssociee?.id_response) return;

      try {
        // Étape 1 : Récupérer la réponse
        const data = await getDemandeByIdReponse(reponseAssociee.id_response);
        setReponseData(data);

        // Étape 2 : Récupérer le numero_terre depuis la réponse
        const numeroTerre = data?.numero_terre;
        if (!numeroTerre) return;

        // Étape 3 : Récupérer les infos du terrain
        const info = await getInfoTerre(numeroTerre);
        setTerrainsInfo({ [numeroTerre]: info });

        // Étape 4 : Initialiser les champs du formulaire
        setFormData(prev => ({
          ...initialFormData,
          id_reponse: reponseAssociee.id_response || '',
          agriculteur: info?.proprietaires?.nomComplet || 'Chargement...',
          nomTechnicien: reponseAssociee?.nomTechnicien || '',
          dateVisite: reponseAssociee?.date_de_sortie
            ? new Date(reponseAssociee.date_de_sortie).toISOString().split('T')[0]
            : '',
          titreFoncier: info?.numeroTitre || '',
          localisation: info?.localisation || '',
        }));
      } catch (err) {
        console.error('Erreur lors du chargement de la réponse ou du terrain :', err);
        setError('Erreur lors du chargement des données.');
      }
    };

    fetchReponseAndTerrain();
  }, [reponseAssociee]);


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
      photos: [...prev.photos, ...files.map(file => ({ file, name: file.name }))]
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

    await new Promise(resolve => setTimeout(resolve, 1000)); // animation de chargement

    if (action === 'save') {
      toast({
        title: "Rapport sauvegardé",
        description: "Votre rapport a été sauvegardé en brouillon.",
        variant: "default"
      });
    } else if (action === 'send') {
      try {
        const pdfBlob = await createGenerateRapport(
          formData.id_reponse,
          formData.titreFoncier,
          formData.nomTechnicien,
          formData.dateVisite,
          formData.region,
          formData.commune,
          formData.gpsLatitude,
          formData.gpsLongitude,
          formData.superficieReelleMesuree,
          formData.typeSol,
          formData.etatSol,
          formData.cultureActuelle,
          formData.systemeIrrigationExistant,
          formData.besoinReel,
          formData.photos.map(p => p.file),
          formData.coherenceDemande,
          formData.remarqueCoherence,
          formData.devisJustifie,
          formData.remarquesTechnicien,
          formData.avis,
          formData.justificationAvis,
          formData.montantEstimeProjet
        );

        // Créer un lien de téléchargement
        const encodedUrl = encodeURIComponent(pdfBlob.rapport);
        window.open(
          `http://localhost:8888/utilisateur/auth/pdf/download/${encodedUrl}`,
          "_blank"
        );

        toast({
          title: "PDF généré",
          description: "Le rapport technique a été généré avec succès.",
          variant: "success"
        });

        // Revenir à la liste
        onBackToList();

      } catch (err) {
        console.error("Erreur lors de la génération du PDF:", err);
        toast({
          title: "Erreur",
          description: "Échec de la génération du rapport PDF.",
          variant: "destructive"
        });
      }
    }

    setIsSubmitting(false);
  };

  const renderSection = (title, icon, fields) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        {icon}
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields}
      </div>
    </div>
  );

  const renderTextareaSection = (title, icon, fields) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        {icon}
        {title}
      </h3>
      <div className="space-y-4">
        {fields}
      </div>
    </div>
  );

  const renderField = (label, fieldName, placeholder, type = "text", options = []) => {
    const commonProps = {
      value: formData[fieldName],
      onChange: (e) => handleInputChange(fieldName, e.target.value),
      placeholder,
    };
    const readOnly = (fieldName === 'id_reponse' || fieldName === 'agriculteur' || fieldName === 'nomTechnicien' || fieldName === 'dateVisite' , fieldName === 'localisation' , fieldName === 'titreFoncier') && !!reponseAssociee;

    return (
      <div key={fieldName}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {type === "select" ? (
          <Select value={formData[fieldName]} onValueChange={(value) => handleInputChange(fieldName, value)}>
            <SelectTrigger className={readOnly ? "bg-gray-100" : ""}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        ) : type === "textarea" ? (
          <Textarea {...commonProps} rows={4} className={readOnly ? "bg-gray-100" : ""} readOnly={readOnly} />
        ) : (
          <Input {...commonProps} type={type} className={readOnly ? "bg-gray-100" : ""} readOnly={readOnly} />
        )}
      </div>
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center mb-4">
        {onBackToList && (
          <Button variant="ghost" size="icon" onClick={onBackToList} className="mr-2 hover:bg-green-50">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white flex-grow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {reponseAssociee ? `Rapport pour ${reponseAssociee.id_response}` : 'Nouveau Rapport de Visite'}
              </h2>
              <p className="text-green-100">
                {reponseAssociee ? `Agriculteur: ${formData.agriculteur}` : 'Remplissez les informations de votre visite terrain'}
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {renderSection("Informations Générales", <Calendar className="w-5 h-5 mr-2 text-green-600" />, [
            renderField("ID Demande", "id_reponse", "Auto-rempli", "text"),
            renderField("Agriculteur", "agriculteur", "Auto-rempli", "text"),
            renderField("Nom du Technicien", "nomTechnicien", "Nom du technicien", "text"),
            renderField("Date de Visite", "dateVisite", "", "date"),
            renderField("Titre Foncier", "titreFoncier", "Numéro du titre foncier", "text"),
          ])}

          {renderSection("Localisation", <MapPin className="w-5 h-5 mr-2 text-green-600" />, [
            renderField("Région", "region", "Région de la visite", "text"),
            renderField("Commune", "commune", "Commune de la visite", "text"),
            renderField("Latitude GPS", "gpsLatitude", "Ex: 33.5731", "text"),
            renderField("Longitude GPS", "gpsLongitude", "Ex: -7.5898", "text"),
            renderField("Adresse / Localisation Détaillée", "localisation", "Complément d'adresse ou description", "text"),
          ])}

          {renderSection("Détails de la Parcelle", <Maximize className="w-5 h-5 mr-2 text-green-600" />, [
            renderField("Superficie Réelle Mesurée (ha)", "superficieReelleMesuree", "Ex: 4.75", "number"),
            renderField("Superficie Demandée (ha)", "superficie", "Ex: 5.00", "number"),
            renderField("Type de Sol", "typeSol", "Ex: Argileux, Sablonneux...", "select", [
              { value: "argileux", label: "Argileux" }, { value: "limoneux", label: "Limoneux" },
              { value: "sableux", label: "Sableux" }, { value: "humifere", label: "Humifère" },
              { value: "calcaire", label: "Calcaire" }, { value: "tourbeux", label: "Tourbeux" },
            ]),
            renderField("État du Sol", "etatSol", "Ex: Humide, Sec, Compacté...", "select", [
              { value: "humide", label: "Humide" }, { value: "sec", label: "Sec" },
              { value: "compacte", label: "Compacté" }, { value: "bien_draine", label: "Bien Drainé" },
              { value: "erode", label: "Érodé" },
            ]),
            renderField("Culture Actuelle", "cultureActuelle", "Ex: Blé, Tomates...", "text"),
          ])}

          {renderTextareaSection("Système d'Irrigation et Besoins", <Droplets className="w-5 h-5 mr-2 text-green-600" />, [
            renderField("Système d'Irrigation Existant", "systemeIrrigationExistant", "Description du système actuel", "textarea"),
            renderField("Besoin Réel Constaté", "besoinReel", "Description des besoins en irrigation", "textarea"),
          ])}

          {renderTextareaSection("Analyse de la Demande", <ClipboardList className="w-5 h-5 mr-2 text-green-600" />, [
            renderField("Cohérence Demande/Terrain", "coherenceDemande", "La demande est-elle cohérente avec le terrain ?", "select", [
              { value: true, label: "Oui" }, { value: false, label: "Non" }
            ]),
            renderField("Remarques sur la Cohérence", "remarqueCoherence", "Expliquez votre évaluation de cohérence", "textarea"),
            renderField("Rendement Estimé Après Projet (si applicable)", "rendementEstime", "Ex: +20%, 5T/ha...", "text"),
            renderField("Devis Justifié et Cohérent?", "devisJustifie", "Le devis fourni est-il justifié ?", "select", [
              { value: true, label: "Oui" }, { value: false, label: "Non" }
            ]),
          ])}

          {renderTextareaSection("Conclusion du Technicien", <Edit2 className="w-5 h-5 mr-2 text-green-600" />, [
            renderField("Remarques Générales du Technicien", "remarquesTechnicien", "Autres observations ou commentaires", "textarea"),
            renderField("Montant Estimé du Projet (MAD)", "montantEstimeProjet", "Estimation du coût total", "number"),
            renderField("Avis du Technicien", "avis", "Favorable, Défavorable, Réservé...", "select", [
              { value: "favorable", label: "Favorable" },
              { value: "defavorable", label: "Défavorable" },
              { value: "reserve", label: "Avec Réserves" },
            ]),
            renderField("Justification de l'Avis", "justificationAvis", "Expliquez votre avis", "textarea"),
          ])}


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
                        {/* <img-replace src={URL.createObjectURL(photo.file)} alt={photo.name} className="object-cover w-full h-full rounded-lg" /> */}
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

        <div className="space-y-6">
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
        </div>
      </div>
    </motion.div>
  );
};

export default RapportForm;