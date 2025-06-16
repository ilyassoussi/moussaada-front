import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/SubventionsCompo/card";
import { Button } from "../../components/SubventionsCompo/button";
import { Filter, CheckSquare ,FileText} from "lucide-react";
import { motion } from "framer-motion";
import { 
  AllRapport,
  validateRapport,
} from "../../services/apiSubvention";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/SubventionsCompo/table";

const ReportsPage = () => {
  const [rappot, setRapport] = useState([]);


const handleViewReport = async (mission) => {
    try {
      if (!mission?.id_rapport) {
        alert("Aucune réponse technique associée à cette mission.");
        return;
      }

      
      if (mission?.rapport) {
        const encodedUrl = encodeURIComponent(mission.rapport);
        window.open(
          `http://localhost:8888/utilisateur/auth/pdf/download/${encodedUrl}`,
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

  const handleValidateReport = async (mission) => {
    try {
      if (!mission?.id_rapport) {
        alert("Aucun rapport associé à cette mission.");
        return;
      }

      await validateRapport(mission.id_rapport);
      alert("Rapport validé avec succès.");
      
    } catch (err) {
      console.error(
        `Erreur lors de la validation du rapport pour la mission ${mission.id}`,
        err
      );
      alert("Une erreur s'est produite lors de la validation du rapport.");
    }
  };


  useEffect(() => {
    const fetchrps = async () => {
      try {
        const data = await AllRapport();
        setRapport(data);
      } catch (err) {
        console.error("Erreur lors du chargement des rps :", err);
      }
    };
    fetchrps();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case false:
        return "text-yellow-500";
      case true:
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

    const setStatus = (status) => {
    switch (status) {
      case false:
        return "n'est pas validée";
      case true:
        return "validé";
      default:
        return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Rapports de Terrain</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          {/* <Button variant="secondary">
            <CheckSquare className="h-4 w-4 mr-2" />
            Valider Sélection
          </Button> */}
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Liste des Rapports de Terrain</CardTitle>
          <CardDescription>
            Consultez et validez les rapports soumis par les agents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID rapport</TableHead>
                <TableHead>rapport	</TableHead>
                <TableHead>status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rappot.map((rp) => (
                <TableRow key={rp.id_rapport}>
                  <TableCell className="font-medium">
                    RAPP {rp.id_rapport}
                  </TableCell>
                  <TableCell>{rp.rapport}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        rp.isvalid
                      )} bg-opacity-20 ${
                        rp.isvalid === false
                          ? "bg-yellow-100"
                          : rp.isvalid === true
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {setStatus(rp.isvalid)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center space-x-1">
                    {rp.id_rapport && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewReport(rp)}
                        title="Voir Rapport"
                      >
                        <FileText className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                    {rp.id_rapport && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleValidateReport(rp)}
                        title="Valider Sélection"
                      >
                        <CheckSquare className="h-4 w-4 mr-2 text-purple-600" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportsPage;
