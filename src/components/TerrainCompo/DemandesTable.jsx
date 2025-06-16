import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Calendar,
  User,
  Euro,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  PaperclipIcon
} from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import ReponseTemporaireModal from '../../components/TerrainCompo/ReponseTemporaireModal';
import {
  getAllDemande,
  getInfoTerre,
  createresponse,
} from '../../services/apiTerrain';
import { toast } from './use-toast';

const DemandesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const itemsPerPage = 8;
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [terrainsInfo, setTerrainsInfo] = useState({});

  const getStatusBadge = (statut) => {
    const statusConfig = {
      EN_ATTENTE: { variant: 'warning', label: 'En Attente' },
      SUR_TERRAIN: { variant: 'primary', label: 'Sur terrain' },
      TERMINEE: { variant: 'success', label: 'Rapport livre' }
    };

    const config = statusConfig[statut] || statusConfig.EN_ATTENTE;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  // ... puis continue avec le filtrage et l'affichage comme tu le fais déjà :
  const filteredDemandes = demandes.filter(demande => {
    const matchesSearch = demande.agriculteur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.statusDemande	?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || demande.statusDemande	 === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);
  const currentDemandes = filteredDemandes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const startIndex = (currentPage - 1) * itemsPerPage;

  const handleOpenModal = (demande) => {
    setSelectedDemande(demande);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDemande(null);
  };

  const handleSaveReponse = async (reponseData) => {
    console.log(reponseData)
    try {
      await createresponse(reponseData.demandeId, reponseData.nomTechnicien, '', '', reponseData.dateSortie);
      toast({
        title: 'Réponse enregistrée',
        description: 'Les informations ont été envoyées avec succès.',
        variant: 'success',
      });
    // Success handling ici
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement :', error);
      }
  };

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
    const fetchDemandes = async () => {
      try {
        const data = await getAllDemande();
        setDemandes(data);
        fetchTerrainsInfo(data);
      } catch (err) {
        setError('Erreur lors du chargement des demandes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDemandes();
  }, []);
  if (loading) return <div>Chargement des demandes...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, ID ou type de demande..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="en_attente">En Attente</SelectItem>
                  <SelectItem value="en_cours">En Cours</SelectItem>
                  <SelectItem value="approuve">Approuvé</SelectItem>
                  <SelectItem value="refuse">Refusé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Demande</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">titre de terre</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Agriculteur</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {demandes.map((demande, index) => (
                  <motion.tr
                    key={demande.id_demande_technique}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">DEM-{demande.id_demande_technique}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <PaperclipIcon className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">DEM- {demande.numero_terre || 'Chargement...'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900"> {terrainsInfo[demande.numero_terre]?.proprietaires.nomComplet || 'Chargement...'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-900">{demande.suvbention_demande}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{new Date(demande.date_creation).toLocaleDateString('Fr', 'fr')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(demande.statusDemande)}
                    </td>
                    <td className="py-4 px-6 space-x-2">
                      {/* <Button variant="ghost" size="sm" className="hover:bg-blue-50 text-blue-600">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button> */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-green-50 text-green-600 border-green-300 hover:border-green-400"
                        onClick={() => handleOpenModal(demande)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Répondre
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredDemandes.length)} sur {filteredDemandes.length} demandes
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
        </div>
      </motion.div>
      {selectedDemande && (
        <ReponseTemporaireModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveReponse}
          demande={selectedDemande}
        />
      )}
    </>
  );
};

export default DemandesTable;