import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/TerrainCompo/Sidebar";
import Header from "../../components/TerrainCompo/Header";
import DemandesTable from "../../components/TerrainCompo/DemandesTable";
import RapportForm from "../../components/TerrainCompo/RapportForm";
import NotificationCenter from "../../components/TerrainCompo/NotificationCenter";
import StatsCards from "../../components/TerrainCompo/StatsCards";
import ReponsesList from "../../components/TerrainCompo/ReponsesList";
import RapportPreviewModal from "../../components/TerrainCompo/RapportPreviewModal";
import ReponseTemporaireModal from "../../components/TerrainCompo/ReponseTemporaireModal";
import { Toaster } from "../../components/TerrainCompo/toaster";
import {Footer} from '../../components/PaysanCompo/footer';
import UseVerifyTokenTerrain from '../../services/useVerifyTokenTerrain'

function TerrainPages() {
  UseVerifyTokenTerrain();
  const [activeSection, setActiveSection] = useState('statistiques');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [reponseModalOpen, setReponseModalOpen] = useState(false);
  const [selectedDemandeForReponse, setSelectedDemandeForReponse] = useState(null);
  const [reponsesTemporaires, setReponsesTemporaires] = useState([]);
  const [currentViewInRapports, setCurrentViewInRapports] = useState('list');
  const [selectedReponseForRapport, setSelectedReponseForRapport] = useState(null);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedReponses = localStorage.getItem('reponsesTemporaires');
    if (storedReponses) {
      setReponsesTemporaires(JSON.parse(storedReponses));
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOpenReponseModal = (demande) => {
    setSelectedDemandeForReponse(demande);
    setReponseModalOpen(true);
  };

  const handleCloseReponseModal = () => {
    setReponseModalOpen(false);
    setSelectedDemandeForReponse(null);
  };

  const handleSaveReponseTemporaire = (data) => {
    const newReponse = { ...data, id: `REP-${Date.now()}`, statut: 'planifie' };
    const updatedReponses = [...reponsesTemporaires, newReponse];
    setReponsesTemporaires(updatedReponses);
    localStorage.setItem('reponsesTemporaires', JSON.stringify(updatedReponses));
    handleCloseReponseModal();
  };

  const handleGenererRapport = (reponse) => {
    setSelectedReponseForRapport(reponse);
    setCurrentViewInRapports('form');
  };
  
  const handleBackToList = () => {
    setSelectedReponseForRapport(null);
    setCurrentViewInRapports('list');
  };


  const renderContent = () => {
    switch (activeSection) {
      case 'demandes':
        return <DemandesTable onOpenReponseModal={handleOpenReponseModal} />;
      case 'rapports':
        if (currentViewInRapports === 'list') {
          return <ReponsesList reponses={reponsesTemporaires} onGenererRapport={handleGenererRapport} />;
        }
        return <RapportForm reponseAssociee={selectedReponseForRapport} onBackToList={handleBackToList} />;
      case 'statistiques':
        return (
          <div className="space-y-6">
            <StatsCards />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tableau de Bord Détaillé</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 nature-pattern">
                  <h4 className="font-semibold text-green-900 mb-2">Activité Récente</h4>
                  <p className="text-green-700 text-sm">Dernière visite effectuée il y a 2 heures.</p>
                  <p className="text-green-700 text-sm mt-1">5 nouveaux rapports soumis aujourd'hui.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 nature-pattern">
                  <h4 className="font-semibold text-blue-900 mb-2">Prochaines Visites</h4>
                  <p className="text-blue-700 text-sm">3 visites programmées cette semaine.</p>
                  <p className="text-blue-700 text-sm mt-1">Prochaine visite : Demain à 10h00 chez M. Dupont.</p>
                </div>
                 <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 lg:col-span-2 nature-pattern">
                  <h4 className="font-semibold text-yellow-900 mb-2">Demandes en Attente de Validation</h4>
                  <p className="text-yellow-700 text-sm">7 demandes nécessitent votre attention.</p>
                  <p className="text-yellow-700 text-sm mt-1">Priorité haute : DEM-2024-008 (délai expirant bientôt).</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return <NotificationCenter />;
      case 'parametres':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres du Compte</h3>
            <p className="text-gray-600">Configuration du compte, préférences d'affichage et notifications.</p>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                <input type="text" name="username" id="username" defaultValue="Ahmed Benali" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                <input type="email" name="email" id="email" defaultValue="ahmed.benali@example.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2" />
              </div>
            </div>
          </div>
        );
      default:
        return <StatsCards />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 nature-pattern">
      <div className="flex h-screen">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            if (section === 'rapports') {
              setCurrentViewInRapports('list'); 
              setSelectedReponseForRapport(null);
            }
          }}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            onMenuToggle={toggleSidebar}
            activeSection={activeSection}
          />

          <main className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection + currentViewInRapports + (selectedReponseForRapport ? selectedReponseForRapport.id : '')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>

      <RapportPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        rapport={null} 
      />

      {selectedDemandeForReponse && (
        <ReponseTemporaireModal
          isOpen={reponseModalOpen}
          onClose={handleCloseReponseModal}
          onSave={handleSaveReponseTemporaire}
          demande={selectedDemandeForReponse}
        />
      )}

      <Toaster />
    </div>
  );
}

export default TerrainPages;
