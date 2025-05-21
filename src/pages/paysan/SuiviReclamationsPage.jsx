import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/PaysanCompo/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/PaysanCompo/table";
import { Badge } from "../../components/PaysanCompo/badge";
import { MessageCircle, MailCheck, ListChecks, AlertCircle } from "lucide-react";
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
import { getAllReclamation } from "../../services/api"; 


const LS_KEY_RECLAMATIONS = "user_reclamations_data";

const getStatusVariant = (status) => {
  switch (status) {
    case true:
      return "default";
    case false:
      return "outline"; 
    default:
      return "default";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function SuiviReclamationsPage() {
  const [reclamations, setReclamations] = useState([]);
  const [selectedReclamation, setSelectedReclamation] = useState(null);

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const data = await getAllReclamation();
        setReclamations(data.sort((a, b) => new Date(b.date) - new Date(a.date)));

      } catch (error) {
        console.error("Erreur lors du chargement des réclamations :", error);
      }
    };

    fetchReclamations();
  }, []);


  const handleViewResponse = (reclamation) => {
    setSelectedReclamation(reclamation);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
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
            Suivi de Mes Réclamations
          </CardTitle>
          <CardDescription>
            Consultez l'état de vos réclamations soumises et les réponses apportées.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-8 space-y-8">
          {reclamations.length === 0 ? (
            <motion.div 
              className="p-10 text-center text-muted-foreground flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AlertCircle size={48} className="text-primary" />
              <p className="text-lg">Aucune réclamation trouvée.</p>
              <p>Vous n'avez pas encore soumis de réclamation. Dirigez-vous vers la page "Réclamations" pour en créer une.</p>
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Date de soumission</TableHead>
                    <TableHead>Votre Reclamation</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Réponse</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reclamations.map((rec, index) => (
                    <motion.tr 
                      key={rec.id} 
                      className="hover:bg-muted/20"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      layout
                    >
                      <TableCell className="font-medium">R-{String(rec.id_reclamation).slice(-5)}</TableCell>
                      <TableCell>{formatDate(rec.date_creation)}</TableCell>
                      <TableCell>{rec.reclamation}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(rec.inTreatment)} className="capitalize">
                          {rec.inTreatment}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {rec.reponse ? (
                          <MailCheck size={20} className="text-destructive mx-auto animate-pulse" />
                        ) : (
                          <MessageCircle size={20} className="text-muted-foreground mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {rec.reponse && (
                          <Button variant="outline" size="sm" onClick={() => handleViewResponse(rec)}>
                            Voir Réponse
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
                        <Footer />
      </Card>

      {selectedReclamation && (
        <AlertDialog open={!!selectedReclamation} onOpenChange={() => setSelectedReclamation(null)}>
          <AlertDialogContent className="bg-card border-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-primary flex items-center gap-2">
                <MailCheck size={24} /> Réponse à la réclamation R-{String(selectedReclamation.id).slice(-5)}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground pt-2">
                <span className="font-semibold">Date de soumission:</span> {formatDate(selectedReclamation.date)}<br/>
                <span className="font-semibold">Votre message:</span> <em className="line-clamp-2">{selectedReclamation.reclamation}</em>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4 p-4 rounded-md bg-muted/50 max-h-60 overflow-y-auto">
              <p className="text-sm text-foreground whitespace-pre-wrap">{selectedReclamation.reponse}</p>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction 
                onClick={() => setSelectedReclamation(null)} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Fermer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
                  <Toaster />
      
    </motion.div>
  );
}
export default SuiviReclamationsPage;