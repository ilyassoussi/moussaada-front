import React, { useState } from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/SubventionsCompo/card';
    import { Button } from '../../components/SubventionsCompo/button';
    import { PlusCircle, Filter, FileText, MessageSquare, Edit, Trash2 } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
    } from '../../components/SubventionsCompo/dialog';
    import { Input } from '../../components/SubventionsCompo/input';
    import { Label } from '../../components/SubventionsCompo/label';
    import { Textarea } from '../../components/SubventionsCompo/textarea';
    import {
      Table,
      TableHeader,
      TableBody,
      TableRow,
      TableHead,
      TableCell,
    } from '../../components/SubventionsCompo/table';

    const initialMissions = [
      { 
        id: 'MISSION001', 
        demandeId: 'DEM001', 
        agriculteur: 'Ali Ben Salah', 
        dateMission: '2025-06-15', 
        statut: 'Planifiée', 
        agent: 'Nadia K.',
        reponseTitre: '',
        reponseDescription: '',
        rapportId: 'RAP001' 
      },
      { 
        id: 'MISSION002', 
        demandeId: 'DEM002', 
        agriculteur: 'Fatima Zohra', 
        dateMission: '2025-06-20', 
        statut: 'En cours', 
        agent: 'Karim B.',
        reponseTitre: 'Vérification initiale OK',
        reponseDescription: 'Le terrain correspond aux informations. Photos prises. Rapport en cours de rédaction.',
        rapportId: 'RAP002'
      },
      { 
        id: 'MISSION003', 
        demandeId: 'DEM003', 
        agriculteur: 'Mohamed Lamine', 
        dateMission: '2025-06-10', 
        statut: 'Terminée', 
        agent: 'Nadia K.',
        reponseTitre: 'Inspection Complète',
        reponseDescription: 'Inspection terminée. Rapport soumis pour validation.',
        rapportId: 'RAP003'
      },
    ];

    const MissionsPage = () => {
      const navigate = useNavigate();
      const [missions, setMissions] = useState(initialMissions);
      const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
      const [currentMission, setCurrentMission] = useState(null);
      const [responseText, setResponseText] = useState({ title: '', description: '' });

      const handleOpenResponseDialog = (mission) => {
        setCurrentMission(mission);
        setResponseText({ title: mission.reponseTitre || '', description: mission.reponseDescription || '' });
        setIsResponseDialogOpen(true);
      };

      const handleSaveResponse = () => {
        if (currentMission) {
          setMissions(missions.map(m => 
            m.id === currentMission.id 
            ? { ...m, reponseTitre: responseText.title, reponseDescription: responseText.description, statut: responseText.title ? 'Répondu' : m.statut } 
            : m
          ));
        }
        setIsResponseDialogOpen(false);
        setCurrentMission(null);
      };

      const handleViewReport = (rapportId) => {
        navigate(`/reports#${rapportId}`); 
      };
      
      const getStatusColor = (status) => {
        switch (status) {
          case 'Planifiée': return 'text-blue-500';
          case 'En cours': return 'text-yellow-500';
          case 'Terminée': return 'text-green-500';
          case 'Répondu': return 'text-purple-500';
          default: return 'text-gray-500';
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
            <h1 className="text-3xl font-bold text-primary">Suivi des Missions Terrain</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button onClick={() => alert("Logique de création de mission à implémenter")}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouvelle Mission
              </Button>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Liste des Missions et Réponses Terrain</CardTitle>
              <CardDescription>Suivez l'avancement des missions et les réponses des agents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Mission</TableHead>
                    <TableHead>Demande ID</TableHead>
                    <TableHead>Agriculteur</TableHead>
                    <TableHead>Date Mission</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {missions.map((mission) => (
                    <TableRow key={mission.id}>
                      <TableCell className="font-medium">{mission.id}</TableCell>
                      <TableCell>{mission.demandeId}</TableCell>
                      <TableCell>{mission.agriculteur}</TableCell>
                      <TableCell>{mission.dateMission}</TableCell>
                      <TableCell>{mission.agent}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(mission.statut)} bg-opacity-20 ${
                          mission.statut === 'Planifiée' ? 'bg-blue-100' :
                          mission.statut === 'En cours' ? 'bg-yellow-100' :
                          mission.statut === 'Terminée' ? 'bg-green-100' :
                          mission.statut === 'Répondu' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          {mission.statut}
                        </span>
                      </TableCell>
                      <TableCell className="text-center space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenResponseDialog(mission)} title="Ajouter/Voir Réponse">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        </Button>
                        {mission.reponseTitre && (
                           <Button variant="ghost" size="icon" onClick={() => handleViewReport(mission.rapportId)} title="Voir Rapport">
                             <FileText className="h-4 w-4 text-green-600" />
                           </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => alert(`Modifier mission ${mission.id}`)} title="Modifier Mission">
                          <Edit className="h-4 w-4 text-yellow-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => alert(`Supprimer mission ${mission.id}`)} title="Supprimer Mission">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Réponse de la Mission {currentMission?.id}</DialogTitle>
                <DialogDescription>
                  Saisissez ou consultez la réponse de l'agent de terrain pour la mission concernant {currentMission?.agriculteur}.
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
                    onChange={(e) => setResponseText(prev => ({...prev, title: e.target.value}))}
                    className="col-span-3" 
                    placeholder="Ex: Vérification initiale"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="responseDescription" className="text-right">
                    Description
                  </Label>
                  <Textarea 
                    id="responseDescription" 
                    value={responseText.description}
                    onChange={(e) => setResponseText(prev => ({...prev, description: e.target.value}))}
                    className="col-span-3"
                    placeholder="Détaillez la réponse de l'agent..."
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                {currentMission?.reponseTitre && (
                  <Button variant="outline" onClick={() => handleViewReport(currentMission.rapportId)}>
                    Voir Rapport Associé
                  </Button>
                )}
                <DialogClose asChild>
                  <Button variant="ghost">Annuler</Button>
                </DialogClose>
                <Button onClick={handleSaveResponse}>Enregistrer Réponse</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </motion.div>
      );
    };

    export default MissionsPage;