import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/PaysanCompo/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/PaysanCompo/table";
import { Badge } from "../../components/PaysanCompo/badge";
import { MessageCircle, MailCheck, ListChecks, AlertCircle, Award, FileText, Info } from "lucide-react";
import { Button } from "../../components/PaysanCompo/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/PaysanCompo/alert-dialog";

const LS_KEY_SUBVENTIONS = "user_subventions_data";

const getStatusVariant = (status) => {
  switch (status) {
    case "Déposée": return "default";
    case "En instruction": return "secondary";
    case "Approuvée": return "outline"; 
    case "Rejetée": return "destructive";
    case "Payée": return "outline";
    default: return "default";
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
  const [subventions, setSubventions] = useState([]);
  const [selectedSubvention, setSelectedSubvention] = useState(null);

  useEffect(() => {
    const storedSubventions = JSON.parse(localStorage.getItem(LS_KEY_SUBVENTIONS) || "[]");
    
    const subventionsWithSimulatedUpdates = storedSubventions.map(sub => {
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

    setSubventions(subventionsWithSimulatedUpdates.sort((a,b) => new Date(b.date_depot) - new Date(a.date_depot)));
    localStorage.setItem(LS_KEY_SUBVENTIONS, JSON.stringify(subventionsWithSimulatedUpdates));
  }, []);

  const handleViewResponse = (subvention) => {
    setSelectedSubvention(subvention);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden bg-card/80 backdrop-blur-md shadow-xl">
        <CardHeader className="bg-muted/30 border-b border-border">
          <CardTitle className="text-2xl flex items-center gap-3 text-primary">
            <ListChecks size={28} />
            Suivi de Mes Demandes de Subvention
          </CardTitle>
          <CardDescription>
            Consultez l'état de vos demandes de subvention et les réponses associées.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {subventions.length === 0 ? (
            <motion.div 
              className="p-10 text-center text-muted-foreground flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AlertCircle size={48} className="text-primary" />
              <p className="text-lg">Aucune demande de subvention trouvée.</p>
              <p>Vous n'avez pas encore soumis de demande. Dirigez-vous vers la page "Demande de Subventions" pour en créer une.</p>
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID Demande</TableHead>
                    <TableHead>Type de Subvention</TableHead>
                    <TableHead>Date de Dépôt</TableHead>
                    <TableHead>N° Titre</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Réponse</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subventions.map((sub, index) => (
                    <motion.tr 
                      key={sub.id} 
                      className="hover:bg-muted/20"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      layout
                    >
                      <TableCell className="font-medium">SUB-{String(sub.id).slice(-5)}</TableCell>
                      <TableCell className="flex items-center gap-2"><Award size={16} className="text-primary/70" /> {sub.type_demande}</TableCell>
                      <TableCell>{formatDate(sub.date_depot)}</TableCell>
                      <TableCell><FileText size={16} className="inline mr-1 text-muted-foreground" />{sub.numero_titre}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(sub.status)} className="capitalize">
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {sub.reponse ? (
                          <MailCheck size={20} className={sub.status === "Rejetée" ? "text-destructive mx-auto animate-pulse" : "text-green-500 mx-auto animate-pulse"} />
                        ) : (
                          <MessageCircle size={20} className="text-muted-foreground mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {sub.reponse && (
                           <Button variant="outline" size="sm" onClick={() => handleViewResponse(sub)}>
                             Voir Détails
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
      </Card>

      {selectedSubvention && (
        <AlertDialog open={!!selectedSubvention} onOpenChange={() => setSelectedSubvention(null)}>
          <AlertDialogContent className="bg-card border-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-primary flex items-center gap-2">
                <Info size={24} /> Détails de la demande SUB-{String(selectedSubvention.id).slice(-5)}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground pt-2 space-y-1">
                <div><span className="font-semibold">Type:</span> {selectedSubvention.type_demande}</div>
                <div><span className="font-semibold">Date de dépôt:</span> {formatDate(selectedSubvention.date_depot)}</div>
                <div><span className="font-semibold">N° Titre:</span> {selectedSubvention.numero_titre}</div>
                <div><span className="font-semibold">Devis:</span> {selectedSubvention.devis_fournisseur_name}</div>
                <div><span className="font-semibold">Description:</span> <em className="line-clamp-2">{selectedSubvention.description}</em></div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4 p-4 rounded-md bg-muted/50 max-h-60 overflow-y-auto">
              <p className="text-sm font-semibold text-foreground mb-1">Réponse / Statut Actuel:</p>
              <p className="text-sm text-foreground whitespace-pre-wrap">{selectedSubvention.reponse || "Aucune réponse pour le moment."}</p>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction 
                onClick={() => setSelectedSubvention(null)} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Fermer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </motion.div>
  );
}
export default SuiviSubventionsPage;