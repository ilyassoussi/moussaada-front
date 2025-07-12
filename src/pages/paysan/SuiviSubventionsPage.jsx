import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "../../components/PaysanCompo/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../../components/PaysanCompo/table";
import { Badge } from "../../components/PaysanCompo/badge";
import {
  MessageCircle, MailCheck, ListChecks, AlertCircle, Award, FileText, Info
} from "lucide-react";
import { Button } from "../../components/PaysanCompo/button";
import { Sidebar } from "../../components/PaysanCompo/sidebar";
import { Header } from "../../components/PaysanCompo/header";
import { Footer } from "../../components/PaysanCompo/footer";
import { Toaster } from "../../components/PaysanCompo/toaster";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/PaysanCompo/alert-dialog";
import { useTranslation } from 'react-i18next';

import UseVerifyToken from '../../services/useVerifyToken';
import { getAllMyDemandePaysan } from '../../services/api';
import { getResponseByDemandePaysan } from '../../services/api';

const getStatusClass = (status) => {
  switch (status) {
    case "VALIDEE":
      return "bg-green-200 text-green-800";
    case "EN_ATTENTE_EVALUATION_TERRAIN":
      return "bg-orange-200 text-orange-800";
    case "REFUSEE":
      return "bg-red-200 text-red-800";
    case "EN_ATTENTE":
      return "bg-gray-200 text-gray-800";
    case "EN_COURS_ETUDE":
      return "bg-blue-200 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

function SuiviSubventionsPage() {
  UseVerifyToken();
  const { t } = useTranslation();

  const [subventions, setSubventions] = useState([]);
  const [selectedSubvention, setSelectedSubvention] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subventionReponse, setSubventionReponse] = useState(null);

  useEffect(() => {
    async function fetchSubventions() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllMyDemandePaysan();

        // Si tu veux garder la simulation des mises à jour de statut (optionnel)
        const subventionsWithSimulatedUpdates = data.map(sub => {
          if (!sub.reponse && Math.random() > 0.6) { 
            const possibleStatus = ["En instruction", "Approuvée", "Rejetée"];
            const newStatus = possibleStatus[Math.floor(Math.random() * possibleStatus.length)];
            let reponseText = `Votre demande de subvention pour "${sub.type_demande}" est actuellement ${newStatus.toLowerCase()}.`;
            if (newStatus === "Approuvée") reponseText += " Félicitations ! Plus de détails suivront.";
            if (newStatus === "Rejetée") reponseText += " Veuillez consulter les motifs dans votre espace personnel.";
            return {
              ...sub,
              reponse: reponseText,
              status: newStatus
            };
          }
          return sub;
        });

        // Trie par date décroissante
        subventionsWithSimulatedUpdates.sort((a,b) => new Date(b.date_depot) - new Date(a.date_depot));

        setSubventions(subventionsWithSimulatedUpdates);
      } catch (err) {
        setError(t("Erreur lors du chargement des demandes.") || "Erreur lors du chargement des demandes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubventions();
  }, [t]);

  const handleViewResponse = async (subvention) => {
    if (["VALIDEE", "REFUSEE"].includes(subvention.statusDemande)) {
      try {
        const reponse = await getResponseByDemandePaysan(subvention.id_demande);
        setSubventionReponse(reponse);
        setSelectedSubvention(subvention);
      } catch (error) {
        console.error("Erreur lors de la récupération de la réponse:", error);
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" }
    })
  };

  // Pour la traduction des statuts
  const translateStatus = (status) => {
    switch(status) {
      case "VALIDEE": return t("suiviSubventionsPage.statusApproved");
      case "EN_ATTENTE_EVALUATION_TERRAIN": return t("suiviSubventionsPage.statusInstruction");
      case "REFUSEE": return t("suiviSubventionsPage.statusRejected");
      case "EN_ATTENTE": return t("suiviSubventionsPage.statusDeposited");
      case "EN_COURS_ETUDE": return t("suiviSubventionsPage.statusEncours");
      default: return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen bg-background text-foreground antialiased"
    >
      <Sidebar />
      <Card className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <CardHeader className="bg-muted/30 border-b border-border">
          <CardTitle className="text-2xl flex items-center gap-3 text-primary">
            <ListChecks size={28} />
            {t("suiviSubventionsPage.title")}
          </CardTitle>
          <CardDescription>
            {t("suiviSubventionsPage.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-8 space-y-8">
          {loading ? (
            <div className="p-10 text-center text-muted-foreground">{t("loading") || "Chargement..."}</div>
          ) : error ? (
            <div className="p-10 text-center text-destructive">{error}</div>
          ) : subventions.length === 0 ? (
            <motion.div 
              className="p-10 text-center text-muted-foreground flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AlertCircle size={48} className="text-primary" />
              <p className="text-lg">{t("suiviSubventionsPage.noGrantsFound")}</p>
              <p>{t("suiviSubventionsPage.noGrantsDesc")}</p>
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t("suiviSubventionsPage.requestID")}</TableHead>
                    <TableHead>{t("suiviSubventionsPage.grantType")}</TableHead>
                    <TableHead>{t("suiviSubventionsPage.depositDate")}</TableHead>
                    <TableHead>{t("suiviSubventionsPage.titleNumber")}</TableHead>
                    <TableHead>{t("suiviSubventionsPage.status")}</TableHead>
                    <TableHead className="text-center">{t("suiviSubventionsPage.response")}</TableHead>
                    <TableHead className="text-right">{t("suiviSubventionsPage.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subventions.map((sub, index) => (
                    <motion.tr 
                      key={sub.id_demande} 
                      className="hover:bg-muted/20"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      layout
                    >
                      <TableCell className="font-medium">DEM-{String(sub.id_demande).slice(-5)}</TableCell>
                      <TableCell className="flex items-center gap-2"><Award size={16} className="text-primary/70" /> {sub.type_demande}</TableCell>
                      <TableCell>{formatDate(sub.dateDepot)}</TableCell>
                      <TableCell><FileText size={16} className="inline mr-1 text-muted-foreground" />{sub.numero_titre}</TableCell>
                      <TableCell>
                        <Badge className={`capitalize ${getStatusClass(sub.statusDemande)}`}>
                          {translateStatus(sub.statusDemande)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {["VALIDEE", "REFUSEE"].includes(sub.statusDemande) ? (
                          <MailCheck size={20} className={sub.statusDemande === "REFUSEE" ? "text-destructive mx-auto animate-pulse" : "text-green-500 mx-auto animate-pulse"} />
                        ) : (
                          <MessageCircle size={20} className="text-muted-foreground mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {["VALIDEE", "REFUSEE"].includes(sub.statusDemande) && (
                          <Button variant="outline" size="sm" onClick={() => handleViewResponse(sub)}>
                            {t("suiviSubventionsPage.viewDetails")}
                          </Button>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        <AlertDialog open={!!selectedSubvention} onOpenChange={() => setSelectedSubvention(null)}>
          <AlertDialogContent className="w-[480px] max-w-full">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-primary flex items-center gap-2">
                <Info size={24} /> {selectedSubvention && t("suiviSubventionsPage.requestDetails", { id: String(selectedSubvention.id_demande).slice(-5) })}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="text-muted-foreground pt-2 space-y-1">
              {selectedSubvention && (
                <>
                  <div><span className="font-semibold">{t("suiviSubventionsPage.type")}: </span> {selectedSubvention.type_demande}</div>
                  <div><span className="font-semibold">{t("suiviSubventionsPage.depositDate")}: </span> {formatDate(selectedSubvention.date_traitement)}</div>
                  <div><span className="font-semibold">{t("suiviSubventionsPage.titleNumber")}: </span> {selectedSubvention.numero_titre}</div>
                  <div><span className="font-semibold">{t("suiviSubventionsPage.quote")}: </span> {subventionReponse?.montantSubvention}</div>
                  <div><span className="font-semibold">{t("suiviSubventionsPage.descriptionLabel")}: </span><em className="line-clamp-2">{selectedSubvention.description}</em></div>
                  <div className="pt-2 border-t border-border">
                    <span className="font-semibold">Reponse :</span>
                    <p className="mt-1 whitespace-pre-wrap">{subventionReponse?.description}</p>
                  </div>
                </>
              )}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction 
                onClick={() => setSelectedSubvention(null)} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t("suiviSubventionsPage.close")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Footer />
      </Card>
      <Toaster />
    </motion.div>
  );
}

export default SuiviSubventionsPage;
