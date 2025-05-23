import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/SubventionsCompo/card";
import { Button } from "../../components/SubventionsCompo/button";
import {
  PlusCircle,
  Edit,
  Trash2,
  Filter,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/SubventionsCompo/table";
import {
  Tabs,
  TabsContent,
} from "../../components/SubventionsCompo/tabs";
import { useToast } from "../../components/SubventionsCompo/use-toast";
import SubsidyTypeFormDialog from "../../components/SubventionsCompo/SubsidyTypeFormDialog";

const initialSubsidyTypes = [
  {
    id: "SUB001",
    nom: "Subvention Irrigation Goutte-à-goutte",
    description:
      "Aide pour l'installation de systèmes d'irrigation économes en eau.",
    montantPlafond: 50000,
    estActif: true,
    criteres: "Surface min 1ha, agriculteur enregistré",
  },
  {
    id: "SUB002",
    nom: "Aide Acquisition Matériel Agricole",
    description: "Subvention pour l'achat de tracteurs et autres équipements.",
    montantPlafond: 150000,
    estActif: true,
    criteres: "Devis proforma, plan d'affaires",
  },
  {
    id: "SUB003",
    nom: "Développement Cultures Bio",
    description: "Soutien à la conversion vers l'agriculture biologique.",
    montantPlafond: 75000,
    estActif: false,
    criteres: "Certification bio en cours, formation spécifique",
  },
];

const SubsidiesPage = () => {
  const { toast } = useToast();
  const [subsidyTypes, setSubsidyTypes] = useState(initialSubsidyTypes);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentSubsidy, setCurrentSubsidy] = useState(null);

  const handleOpenDialog = (subsidy = null) => {
    setCurrentSubsidy(subsidy);
    setIsFormDialogOpen(true);
  };

  const handleSaveSubsidyType = (formData) => {
    if (currentSubsidy) {
      setSubsidyTypes(
        subsidyTypes.map((s) =>
          s.id === currentSubsidy.id
            ? {
                ...currentSubsidy,
                ...formData,
                montantPlafond: parseFloat(formData.montantPlafond),
              }
            : s
        )
      );
      toast({ title: "Succès", description: "Type de subvention modifié." });
    } else {
      const newSubsidy = {
        id: `SUB${String(subsidyTypes.length + 1).padStart(3, "0")}`,
        ...formData,
        montantPlafond: parseFloat(formData.montantPlafond),
      };
      setSubsidyTypes([...subsidyTypes, newSubsidy]);
      toast({
        title: "Succès",
        description: "Nouveau type de subvention ajouté.",
      });
    }
    setIsFormDialogOpen(false);
    setCurrentSubsidy(null);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce type de subvention ?"
      )
    ) {
      setSubsidyTypes(subsidyTypes.filter((s) => s.id !== id));
      toast({
        title: "Succès",
        description: "Type de subvention supprimé.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-primary flex items-center">
        <DollarSign className="mr-2 h-8 w-8" />
        Gestion des Subventions
      </h1>

      <Tabs defaultValue="subsidyTypes" className="w-full">
        <TabsContent value="subsidyTypes">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Liste des Types de Subvention</CardTitle>
                  <CardDescription>
                    Gérez les différents types de subventions disponibles.
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                  </Button>
                  <Button onClick={() => handleOpenDialog()}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nouveau Type
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Plafond (DA)</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subsidyTypes.map((subsidy) => (
                    <TableRow key={subsidy.id}>
                      <TableCell className="font-medium">
                        {subsidy.id}
                      </TableCell>
                      <TableCell>{subsidy.nom}</TableCell>
                      <TableCell>
                        {subsidy.montantPlafond.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            subsidy.estActif
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {subsidy.estActif ? "Actif" : "Inactif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(subsidy)}
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4 text-yellow-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(subsidy.id)}
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <SubsidyTypeFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setCurrentSubsidy(null);
        }}
        onSave={handleSaveSubsidyType}
        subsidyTypeData={currentSubsidy}
      />
    </motion.div>
  );
};

export default SubsidiesPage;
