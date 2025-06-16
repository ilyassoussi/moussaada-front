import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/SubventionsCompo/card";
import { Button } from "../../components/SubventionsCompo/button";
import { Filter, FileText, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../components/SubventionsCompo/dialog";
import { Input } from "../../components/SubventionsCompo/input";
import { Label } from "../../components/SubventionsCompo/label";
import { Textarea } from "../../components/SubventionsCompo/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/SubventionsCompo/table";

import {
  AlldemandeTechnique,
  ReponsedemandeTechnique,
} from "../../services/apiSubvention";

const MissionsPage = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [currentMission, setCurrentMission] = useState(null);
  const [responseText, setResponseText] = useState({
    title: "",
    description: "",
  });

  const handleOpenResponseDialog = async (mission) => {
    setCurrentMission(mission);

    if (
      mission.statusDemande === "SUR_TERRAIN" ||
      mission.statusDemande === "TERMINEE"
    ) {
      try {
        const response = await ReponsedemandeTechnique(
          mission.id_reponse_technique
        );

        if (!response) {
          alert("Aucune réponse trouvée.");
          return;
        }

        setResponseText({
          title: response.titre || "",
          description: response.commentaire || "",
          nomTechnicien: response.nomTechnicien || "",
          date_de_sortie: response.date_de_sortie || "",
          rapport: response.id_rapport?.rapport || null,
        });
      } catch (err) {
        console.error("Erreur API réponse technique :", err);
        alert("Impossible de charger la réponse technique.");
      }
    }

    setIsResponseDialogOpen(true);
  };

  const handleViewReport = async (mission) => {
    try {
      if (!mission?.id_reponse_technique) {
        alert("Aucune réponse technique associée à cette mission.");
        return;
      }

      const response = await ReponsedemandeTechnique(
        mission.id_reponse_technique
      );
      if (response?.id_rapport?.rapport) {
        const encodedUrl = encodeURIComponent(response.id_rapport.rapport);
        window.open(
          `/utilisateur/auth/pdf/download/${encodedUrl}`,
          "_blank"
        );
      } else {
        alert("Aucun rapport disponible pour cette mission.");
      }
    } catch (err) {
      console.error(
        `Erreur lors de l'accès au rapport de la mission ${mission.id}`,
        err
      );
      alert("Une erreur s'est produite lors du chargement du rapport.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Planifiée":
        return "text-blue-500";
      case "En cours":
        return "text-yellow-500";
      case "TERMINEE":
        return "text-green-500";
      case "SUR_TERRAIN":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const setStatus = (status) => {
    switch (status) {
      case "TERMINEE":
        return "Terminee";
      case "SUR_TERRAIN":
        return "Sur terrain";
      case "EN_COURS":
        return "En cours";
      default:
        return "En cours";
    }
  };

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const data = await AlldemandeTechnique();
        if(data){
          setMissions(data);
        } else {
          setMissions([])
        }
          
        setLoading(false);
        // Mise à jour automatique des infos si SUR_TERRAIN ou TERMINEE
        data.forEach(async (mission) => {
          if (
            mission.statusDemande === "SUR_TERRAIN" ||
            mission.statusDemande === "TERMINEE"
          ) {
            try {
              const response = await ReponsedemandeTechnique(
                mission.id_reponse_technique
              );
              if (response) {
                const updated = {
                  ...mission,
                  nomTechnicien: response.nomTechnicien || "----",
                  date_de_sortie: response.date_de_sortie || "-----",
                  id_rapport: response.id_rapport.rapport,
                };
                // Met à jour la mission dans le tableau
                setMissions((prevMissions) =>
                  prevMissions.map((m) =>
                    m.id_demande_technique === mission.id_demande_technique
                      ? updated
                      : m
                  )
                );
              }
            } catch (err) {
              console.error(
                `Erreur lors de la mise à jour de la mission ${mission.id}`,
                err
              );
            }
          }
        });
      } catch (err) {
        console.error("Erreur lors du chargement des missions :", err);
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">
          Suivi des Missions Terrain
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Liste des Missions et Réponses Terrain</CardTitle>
          <CardDescription>
            Suivez l'avancement des missions et les réponses des agents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Mission</TableHead>
                <TableHead>Demande ID</TableHead>
                <TableHead>Date de Sortie</TableHead>
                <TableHead>Technicien</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {missions.map((mission) => (
                <TableRow key={mission.id_demande_technique}>
                  <TableCell className="font-medium">
                    MIS {mission.id_demande_technique}
                  </TableCell>
                  <TableCell>DEM {mission.id_traitent_demande}</TableCell>
                  <TableCell>
                    {new Date(mission.date_de_sortie).toLocaleDateString(
                      "fr-FR"
                    )}
                  </TableCell>
                  <TableCell>{mission.nomTechnicien}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        mission.statusDemande
                      )} bg-opacity-20 ${
                        mission.statusDemande === "Planifiée"
                          ? "bg-blue-100"
                          : mission.statusDemande === "En cours"
                          ? "bg-yellow-100"
                          : mission.statusDemande === "TERMINEE"
                          ? "bg-green-100"
                          : mission.statusDemande === "SUR_TERRAIN"
                          ? "bg-purple-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {setStatus(mission.statusDemande)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center space-x-1">
                    {mission.id_reponse_technique && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenResponseDialog(mission)}
                        title="Voir Avis"
                      >
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </Button>
                    )}
                    {mission.id_rapport && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewReport(mission)}
                        title="Voir Rapport"
                      >
                        <FileText className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={isResponseDialogOpen}
        onOpenChange={setIsResponseDialogOpen}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              Réponse de la Mission {currentMission?.id}
            </DialogTitle>
            <DialogDescription>
              Consultez la réponse de l'agent de terrain pour la
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responseTitle" className="text-right">
                Titre
              </Label>
              <Input
                id="responseTitle"
                value={responseText.title}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responseDescription" className="text-right">
                Description
              </Label>
              <Textarea
                id="responseDescription"
                value={responseText.description}
                className="col-span-3"
                rows={4}
                disabled
              />
            </div>
          </div>
          <DialogFooter>
            {currentMission?.reponseTitre && (
              <Button
                variant="outline"
                onClick={() => handleViewReport(currentMission.rapportId)}
              >
                Voir Rapport Associé
              </Button>
            )}
            <DialogClose asChild>
              <Button variant="ghost">Annuler</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default MissionsPage;
