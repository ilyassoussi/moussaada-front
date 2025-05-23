import React, { useState, useCallback } from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/SubventionsCompo/card';
    import { Button } from '../../components/SubventionsCompo/button';
    import { PlusCircle, Filter, Download, Info, Tractor } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { useToast } from '../../components/SubventionsCompo/use-toast';
    import {
      Table,
      TableHeader,
      TableBody,
      TableRow,
      TableHead,
      TableCell,
    } from '../../components/SubventionsCompo/table';
    import ApplicationFormDialog from '../../components/SubventionsCompo/ApplicationFormDialog';

    const initialApplications = [
      { id: 'DEM001', agriculteur: 'Ali Ben Salah', typeSubvention: 'Irrigation', dateSoumission: '2025-05-10', statut: 'En instruction', titreFoncier: 'TF12345', terrainInfo: null, details: 'Demande pour système goutte-à-goutte.' },
      { id: 'DEM002', agriculteur: 'Fatima Zohra', typeSubvention: 'Matériel Agricole', dateSoumission: '2025-05-15', statut: 'Approuvée', titreFoncier: 'TF67890', terrainInfo: { titre: 'TF67890', proprietaire: 'Fatima Zohra', superficie: '10 Ha', localisation: 'Sidi Bel Abbès', typeSol: 'Argileux', observations: 'RAS' }, details: 'Achat d\'un tracteur neuf.' },
      { id: 'DEM003', agriculteur: 'Karim Mahmoud', typeSubvention: 'Amélioration foncière', dateSoumission: '2025-05-20', statut: 'En attente', titreFoncier: 'TF99001', terrainInfo: null, details: '' },
    ];

    const ApplicationsPage = () => {
      const { toast } = useToast();
      const [applications, setApplications] = useState(initialApplications);
      const [isFormOpen, setIsFormOpen] = useState(false);
      const [currentApplication, setCurrentApplication] = useState(null);

      const handleOpenForm = useCallback((app = null) => {
        setCurrentApplication(app);
        setIsFormOpen(true);
      }, []);

      const handleCloseForm = useCallback(() => {
        setIsFormOpen(false);
        setCurrentApplication(null);
      }, []);
      
      const handleSaveApplication = useCallback((formData, terrainInfoData) => {
        if (currentApplication) {
          setApplications(prevApps => prevApps.map(app => 
            app.id === currentApplication.id ? { ...currentApplication, ...formData, terrainInfo: terrainInfoData } : app
          ));
          toast({ title: "Succès", description: "Demande de subvention modifiée." });
        } else {
          const newApp = { 
            id: `DEM${String(applications.length + 1).padStart(3, '0')}`, 
            ...formData, 
            terrainInfo: terrainInfoData 
          };
          setApplications(prevApps => [...prevApps, newApp]);
          toast({ title: "Succès", description: "Nouvelle demande de subvention créée." });
        }
        handleCloseForm();
      }, [currentApplication, applications.length, toast, handleCloseForm]);

      const handleSendToMission = useCallback((applicationId) => {
        setApplications(prevApps => prevApps.map(app => 
          app.id === applicationId ? { ...app, statut: 'Mission requise' } : app
        ));
        toast({ 
          title: "Mission Terrain Initiée", 
          description: `La demande ${applicationId} a été envoyée pour une visite terrain.`,
          variant: "default" 
        });
        handleCloseForm(); 
      }, [toast, handleCloseForm]);
      
      const getStatusColor = (status) => {
        switch (status) {
          case 'En attente': return 'text-gray-500 bg-gray-100';
          case 'En instruction': return 'text-blue-500 bg-blue-100';
          case 'Mission requise': return 'text-yellow-600 bg-yellow-100';
          case 'Approuvée': return 'text-green-500 bg-green-100';
          case 'Rejetée': return 'text-red-500 bg-red-100';
          default: return 'text-gray-500 bg-gray-100';
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Demandes</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button onClick={() => handleOpenForm()}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouvelle Demande
              </Button>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Liste des Demandes de Subvention</CardTitle>
              <CardDescription>Consultez et gérez toutes les demandes de subvention.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Demande</TableHead>
                    <TableHead>Agriculteur</TableHead>
                    <TableHead>Type Subvention</TableHead>
                    <TableHead>Date Soumission</TableHead>
                    <TableHead>Titre Foncier</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.id}</TableCell>
                      <TableCell>{app.agriculteur}</TableCell>
                      <TableCell>{app.typeSubvention}</TableCell>
                      <TableCell>{app.dateSoumission}</TableCell>
                      <TableCell>{app.titreFoncier || 'N/A'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.statut)}`}>
                          {app.statut}
                        </span>
                      </TableCell>
                      <TableCell className="text-center space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenForm(app)} title="Modifier/Voir">
                          <Info className="h-4 w-4 text-blue-600" />
                        </Button>
                        {app.statut !== 'Mission requise' && app.statut !== 'Approuvée' && app.statut !== 'Rejetée' && (
                           <Button variant="ghost" size="icon" onClick={() => {
                            setCurrentApplication(app); // Pour que le dialog sache quelle app mettre à jour
                            handleSendToMission(app.id);
                           }} title="Envoyer en Mission Terrain">
                             <Tractor className="h-4 w-4 text-orange-500" />
                           </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

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