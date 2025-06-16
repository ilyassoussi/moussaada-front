import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  User, 
  Calendar, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Edit,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { getAllresponse,getInfoTerre, } from '../../services/apiTerrain';

const ReponsesList = ({ onGenererRapport }) => {
  const [reponses, setReponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [terrainsInfo, setTerrainsInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fetchTerrainsInfo = async (demandes) => {
      const infoMap = {};

      await Promise.all(
        demandes.map(async (demande) => {
          try {
            const info = await getInfoTerre(demande.numero_terre);
            infoMap[demande.numero_terre] = info;
          } catch (err) {
            console.error(`Erreur pour la terre ${demande.numero_terre}`, err);
          }
        })
      );

      setTerrainsInfo(infoMap);
    };
  useEffect(() => {
    const fetchReponses = async () => {
      setLoading(true);
      try {
        const data = await getAllresponse();
        setReponses(data);
        fetchTerrainsInfo(data);
      } catch (err) {
        setError('Erreur lors du chargement des réponses.');
      } finally {
        setLoading(false);
      }
    };
    fetchReponses();
  }, []);

  const getStatusBadge = (statut) => {
    const statusConfig = {
      SUR_TERRAIN: { variant: 'default', label: 'Planifié', icon: <Clock className="w-3 h-3 mr-1" /> },
      TERMINEE: { variant: 'success', label: 'Rapport Généré', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
    };
    
    const config = statusConfig[statut] || { variant: 'secondary', label: 'Inconnu', icon: null };
    return (
      <Badge variant={config.variant} className="flex items-center">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const totalPages = Math.ceil(reponses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReponses = reponses.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <p>Chargement des réponses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (reponses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune Visite Planifiée</h3>
        <p className="text-gray-500">
          Commencez par créer une réponse temporaire à une demande de subvention.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ClipboardList className="w-6 h-6 mr-3 text-green-600" />
            Visites Planifiées et Rapports
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">ID Demande</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Agriculteur</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Technicien</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Date de Sortie</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut Visite</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentReponses.map((reponse, index) => (
                <motion.tr
                  key={reponse.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">DEM-{reponse.id_traitement_subvention}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{terrainsInfo[reponse.numero_terre]?.proprietaires.nomComplet || 'Chargement...'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{reponse.nomTechnicien}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{new Date(reponse.date_de_sortie).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(reponse.etats)}
                  </td>
                  <td className="py-4 px-6">
                    {reponse.etats	 === 'SUR_TERRAIN' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover:bg-green-50 text-green-600 border-green-300 hover:border-green-400"
                        onClick={() => onGenererRapport(reponse)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Générer Rapport
                      </Button>
                    )}
                    {reponse.etats	 === 'TERMINEE' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:bg-blue-50"
                        disabled 
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Rapport Soumis
                      </Button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, reponses.length)} sur {reponses.length} réponses
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} sur {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReponsesList;
