import React, { useEffect , useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/SubventionsCompo/card";
import { Toaster } from "../../components/PaysanCompo/toaster";
import Swal from 'sweetalert2'
import { Button } from "../../components/SubventionsCompo/button";
import { useToast } from "../../components/PaysanCompo/use-toast";

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
import SubsidyTypeFormDialog from "../../components/SubventionsCompo/SubsidyTypeFormDialog";
import {
  createSubventions,
  getAllSubventions,
  updateSuvbention,
  DeleteSubventions
} from "../../services/apiSubvention";

const SubsidiesPage = () => {
  const { toast } = useToast();
  const [subsidyTypes, setSubsidyTypes] = useState([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentSubsidy, setCurrentSubsidy] = useState(null);

  const handleOpenDialog = (subsidy = null) => {
    setCurrentSubsidy(subsidy);
    setIsFormDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsFormDialogOpen(false);
    setCurrentSubsidy(null);
  };

  const categories = {
    IRRIGATION_GOUTTE_A_GOUTTE: "Irrigation goutte à goutte",
    IRRIGATION_PAR_ASPERSION: "Irrigation par aspersion",
    PLANTATION_OLIVIERS: "Plantation d'oliviers",
    PLANTATION_ARBRES_FRUITIERS: "Plantation d'arbres fruitiers",
    ELEVAGE_BOVINS: "Élevage de bovins",
    ELEVAGE_OVINS: "Élevage d'ovins",
    MATERIEL_AGRICOLE: "Matériel agricole",
    CONSTRUCTION_SERRE: "Construction de serre",
    TRANSFORMATION_PRODUITS: "Transformation des produits agricoles",
    ENERGIE_SOLAIRES: "Énergie solaire",
    CLÔTURE_TERRAIN: "Clôture de terrain",
    REBOISEMENT: "Reboisement"
  };

  const handleSaveSubsidyType = async (formData) => {
    try {
      if (currentSubsidy) {
        await updateSuvbention(currentSubsidy.id, formData);
        toast({ title: "Succès", description: "Subvention modifiée avec succès." });
      } else {
        await createSubventions(
          formData.categorie,
          formData.description,
          formData.montantMaximum,
          formData.pourcentageSubvention,
          formData.dateDebut,
          formData.dateFin,
          formData.conditionsEligibilite,
          formData.piecesRequises,
          formData.id_region
        );
        toast({ title: "Succès", description: "Subvention créée avec succès." });
      }
      await fetchSubsidies();
      setIsFormDialogOpen(false);
    } catch (error) {
      toast({ title: "Erreur", description: error.message || "Échec de la sauvegarde." });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await DeleteSubventions(id);
            await fetchSubsidies();
          } catch (error) {
            toast({ title: "Erreur", description: error.message || "Échec de la suppression." });
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });

  };

  useEffect(() => {
    fetchSubsidies();
  }, []);

  const fetchSubsidies = async () => {
    try {
      const data = await getAllSubventions();
      setSubsidyTypes(data.data);
    } catch (error) {
      toast({ title: "Erreur", description: "Échec du chargement des subventions." });
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
                    <TableHead>Categories</TableHead>
                    <TableHead>Montant Maximum</TableHead>
                    <TableHead>Pourcentage Subvention</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subsidyTypes.map((subsidy) => (
                    <TableRow key={subsidy.id}>
                      <TableCell className="font-medium">{subsidy.id}</TableCell>
                      <TableCell>{categories[subsidy.categorie]}</TableCell>
                      <TableCell>{subsidy.montantMaximum.toLocaleString()}</TableCell>
                      <TableCell>{subsidy.pourcentageSubvention}%</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            subsidy.estActif
                              ? "bg-green-100 text-green-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {subsidy.estActif ? "Actif" : "Actif"}
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
        onClose={handleCloseDialog}
        onSave={handleSaveSubsidyType}
        subsidyTypeData={currentSubsidy}
        categories={categories}
      />
            <Toaster />
      
    </motion.div>
  );
};

export default SubsidiesPage;
