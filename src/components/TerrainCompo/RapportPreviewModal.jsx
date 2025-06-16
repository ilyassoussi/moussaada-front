
import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Download, 
  Send, 
  Calendar,
  MapPin,
  User,
  FileText,
  Camera,
  CheckCircle
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './dialog';

const RapportPreviewModal = ({ isOpen, onClose, rapport }) => {
  if (!rapport) return null;

  const mockRapport = {
    id: 'RAP-2024-001',
    demandeId: 'DEM-2024-001',
    agriculteur: 'Mohamed Alami',
    dateVisite: '2024-02-05',
    typeVisite: 'Visite Initiale',
    localisation: '33.5731, -7.5898 - Casablanca',
    observations: 'Installation d\'irrigation goutte à goutte conforme aux spécifications. Système de filtration en bon état. Réseau de distribution bien dimensionné pour la superficie de 5 hectares. Quelques ajustements mineurs nécessaires au niveau des goutteurs.',
    recommandations: 'Ajuster la pression des goutteurs dans la zone nord. Prévoir un entretien mensuel du système de filtration. Former l\'agriculteur aux bonnes pratiques d\'utilisation.',
    conformite: 'Conforme',
    photos: [
      'Installation principale',
      'Système de filtration',
      'Réseau de distribution',
      'Zone d\'irrigation'
    ],
    statut: 'Envoyé',
    dateEnvoi: '2024-02-05T16:30:00'
  };

  const getConformiteBadge = (conformite) => {
    const config = {
      'Conforme': { variant: 'success', label: 'Conforme' },
      'Partiellement Conforme': { variant: 'warning', label: 'Partiellement Conforme' },
      'Non Conforme': { variant: 'destructive', label: 'Non Conforme' },
      'En Cours': { variant: 'default', label: 'En Cours d\'Installation' }
    };
    
    const { variant, label } = config[conformite] || config['Conforme'];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Aperçu du Rapport</h2>
              <p className="text-sm text-gray-500 font-normal">{mockRapport.id}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Agriculteur</p>
                  <p className="font-medium">{mockRapport.agriculteur}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Date de Visite</p>
                  <p className="font-medium">{mockRapport.dateVisite}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Conformité</p>
                  {getConformiteBadge(mockRapport.conformite)}
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informations de la Visite</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Demande Associée</p>
                    <p className="font-medium">{mockRapport.demandeId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type de Visite</p>
                    <p className="font-medium">{mockRapport.typeVisite}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Localisation</p>
                      <p className="font-medium">{mockRapport.localisation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  Photos ({mockRapport.photos.length})
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {mockRapport.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">{photo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Observations</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {mockRapport.observations}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Recommandations</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {mockRapport.recommandations}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Statut</h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">{mockRapport.statut}</p>
                      <p className="text-sm text-green-700">
                        Envoyé le {new Date(mockRapport.dateEnvoi).toLocaleDateString('fr-FR')} à {new Date(mockRapport.dateEnvoi).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Fermer
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Télécharger PDF
            </Button>
            <Button className="agricultural-gradient">
              <Send className="w-4 h-4 mr-2" />
              Renvoyer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RapportPreviewModal;
