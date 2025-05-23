import React from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/SubventionsCompo/card';
    import { Button } from '../../components/SubventionsCompo/button';
    import { PlusCircle, Users, SlidersHorizontal } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/SubventionsCompo/tabs";


    const SettingsPage = () => {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-primary">Paramètres (OBSOLÈTE)</h1>
          <p className="text-muted-foreground">Cette page est conservée temporairement mais ses fonctionnalités sont déplacées vers "Gestion Subventions".</p>
          
          <Tabs defaultValue="subsidyTypes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="subsidyTypes">Types de Subvention (Déplacé)</TabsTrigger>
              <TabsTrigger value="users">Gestion Utilisateurs (Déplacé)</TabsTrigger>
              <TabsTrigger value="general">Général (Déplacé)</TabsTrigger>
            </TabsList>

            <TabsContent value="subsidyTypes">
              <Card className="shadow-lg opacity-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Types de Subvention</CardTitle>
                      <CardDescription>Cette section est maintenant gérée dans "Gestion Subventions".</CardDescription>
                    </div>
                    <Button disabled>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Nouveau Type
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Contenu déplacé.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card className="shadow-lg opacity-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestion des Utilisateurs</CardTitle>
                      <CardDescription>Cette section est maintenant gérée dans "Gestion Subventions".</CardDescription>
                    </div>
                    <Button disabled>
                      <Users className="h-4 w-4 mr-2" />
                      Nouvel Utilisateur
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Contenu déplacé.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="general">
              <Card className="shadow-lg opacity-50">
                <CardHeader>
                  <CardTitle>Paramètres Généraux</CardTitle>
                  <CardDescription>Cette section est maintenant gérée dans "Gestion Subventions".</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="appName" className="block text-sm font-medium text-foreground">Nom de l'application</label>
                    <input type="text" id="appName" defaultValue="MOUSSAADA" className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" disabled />
                  </div>
                  <div>
                    <label htmlFor="appLogo" className="block text-sm font-medium text-foreground">Logo de l'application</label>
                    <input type="file" id="appLogo" className="mt-1 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" disabled/>
                  </div>
                  <Button disabled>
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Sauvegarder les Changements
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      );
    };

    export default SettingsPage;