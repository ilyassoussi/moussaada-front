import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/SubventionsCompo/card";
import { Button } from "../../components/SubventionsCompo/button";
import SubventionDetailsDialog from "../../components/SubventionsCompo/SubventionInformationDialogue";
import { PlusCircle, Filter, Download, Info, Tractor } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "../../components/SubventionsCompo/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/TerrainCompo/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/SubventionsCompo/table";
import ApplicationFormDialog from "../../components/SubventionsCompo/ApplicationFormDialog";
import { getAllSubventionsById, getAllDemandeNoTraitment } from "../../services/apiSubvention";

const ITEMS_PER_PAGE = 6;

const ApplicationsPage = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [selectedSubvention, setSelectedSubvention] = useState(null);
  const [showSubventionDialog, setShowSubventionDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleOpenForm = useCallback((app = null) => {
    setCurrentApplication(app);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setCurrentApplication(null);
  }, []);

  const handleShowSubventionDetails = (subvention) => {
    setSelectedSubvention(subvention);
    setShowSubventionDialog(true);
  };

  const handleSaveApplication = useCallback(
    (formData, terrainInfoData) => {
      if (currentApplication) {
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app.id === currentApplication.id
              ? {
                  ...currentApplication,
                  ...formData,
                  terrainInfo: terrainInfoData,
                }
              : app
          )
        );
        toast({ title: "Succès", description: "Demande modifiée." });
      } else {
        const newApp = {
          id: `DEM${String(applications.length + 1).padStart(3, "0")}`,
          ...formData,
          terrainInfo: terrainInfoData,
        };
        setApplications((prevApps) => [...prevApps, newApp]);
        toast({ title: "Succès", description: "Demande créée." });
      }
      handleCloseForm();
    },
    [currentApplication, applications.length, toast, handleCloseForm]
  );

  const handleSendToMission = useCallback(
    (applicationId) => {
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === applicationId ? { ...app, statut: "Mission requise" } : app
        )
      );
      toast({
        title: "Mission Initiée",
        description: `Demande ${applicationId} envoyée.`,
      });
      handleCloseForm();
    },
    [toast, handleCloseForm]
  );

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const demandes = await getAllDemandeNoTraitment();
        const demandesAvecSubvention = await Promise.all(
          demandes.map(async (demande) => {
            try {
              const subventionData = await getAllSubventionsById(demande.id_subvention);
              return { ...demande, subvention: subventionData };
            } catch {
              return { ...demande, subvention: null };
            }
          })
        );
        setApplications(demandesAvecSubvention);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Échec de chargement des demandes.",
          variant: "destructive",
        });
      }
    };
    fetchApplications();
  }, [toast]);

  useEffect(() => {
    let filtered = [...applications];
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.statusDemande === statusFilter);
    }
    setFilteredApplications(filtered);
    setCurrentPage(1); // reset page when filter changes
  }, [applications, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "EN_ATTENTE":
        return "text-gray-500 bg-gray-100";
      case "EN_COURS_ETUDE":
        return "text-blue-500 bg-blue-100";
      case "EN_ATTENTE_EVALUATION_TERRAIN":
        return "text-yellow-600 bg-yellow-100";
      case "VALIDEE":
        return "text-green-500 bg-green-100";
      case "REFUSEE":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case "EN_ATTENTE":
        return "En attente";
      case "EN_COURS_ETUDE":
        return "En cours d'étude";
      case "EN_ATTENTE_EVALUATION_TERRAIN":
        return "En attente terrain";
      case "VALIDEE":
        return "Validée";
      case "REFUSEE":
        return "Refusée";
      default:
        return status;
    }
  };

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApps = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Gestion des Demandes</h1>
        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="EN_ATTENTE">En attente</SelectItem>
            <SelectItem value="EN_COURS_ETUDE">En cours d'étude</SelectItem>
            <SelectItem value="EN_ATTENTE_EVALUATION_TERRAIN">En attente terrain</SelectItem>
            <SelectItem value="VALIDEE">Refusé</SelectItem>
            <SelectItem value="REFUSEE">Validée</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Liste des Demandes</CardTitle>
          <CardDescription>Consultez et gérez les demandes de subvention.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Demande</TableHead>
                <TableHead>ID Subvention</TableHead>
                <TableHead>Titre Foncier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Commentaire</TableHead>
                <TableHead>PDF</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedApps.map((app) => (
                <TableRow key={app.id_demande}>
                  <TableCell>{app.id_demande}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleShowSubventionDetails(app.subvention?.data)}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {app.id_subvention}
                    </button>
                  </TableCell>
                  <TableCell>{app.numero_titre || "N/A"}</TableCell>
                  <TableCell>{new Date(app.dateDepot).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.statusDemande)}`}
                    >
                      {formatStatus(app.statusDemande)}
                    </span>
                  </TableCell>
                  <TableCell>{app.description || "N/A"}</TableCell>
                  <TableCell>
                    {app.devis_fournisseur ? (
                      <a
                        href={`http://localhost:8888/utilisateur/auth/pdf/download/${encodeURIComponent(
                          app.devis_fournisseur
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Voir PDF
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">Non disponible</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(app)} title="Modifier/Voir">
                      <Info className="h-4 w-4 text-blue-600" />
                    </Button>
                    {app.statut !== "Mission requise" &&
                      app.statut !== "Approuvée" &&
                      app.statut !== "Rejetée" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentApplication(app);
                            handleSendToMission(app.id);
                          }}
                          title="Envoyer en Mission"
                        >
                          <Tractor className="h-4 w-4 text-orange-500" />
                        </Button>
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
              Précédent
            </Button>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
              Suivant
            </Button>
          </div>
        </CardContent>
      </Card>

      <SubventionDetailsDialog
        isOpen={showSubventionDialog}
        onClose={() => setShowSubventionDialog(false)}
        subvention={selectedSubvention}
      />
      {isFormOpen && (
        <ApplicationFormDialog
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSaveApplication}
          applicationData={currentApplication}
          onSendToMission={handleSendToMission}
        />
      )}
    </motion.div>
  );
};

export default ApplicationsPage;
