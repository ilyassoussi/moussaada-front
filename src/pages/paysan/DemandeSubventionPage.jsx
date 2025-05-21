import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "../../components/PaysanCompo/card";
import { Input } from "../../components/PaysanCompo/input";
import { Label } from "../../components/PaysanCompo/label";
import { Button } from "../../components/PaysanCompo/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/PaysanCompo/select";
import { Textarea } from "../../components/PaysanCompo/textarea";
import { useToast } from "../../components/PaysanCompo/use-toast";
import { FileText, UploadCloud, Send, Award, Edit } from "lucide-react";

const subventionTypes = [
  { id: "SUB_AGRI_MAT", name: "Subvention Matériel Agricole" },
  { id: "SUB_IRRIG_MOD", name: "Subvention Irrigation Moderne" },
  { id: "SUB_ENERG_SOL", name: "Subvention Énergie Solaire" },
  { id: "SUB_JEUNE_AGRI", name: "Subvention Jeune Agriculteur" },
];

const LS_KEY_SUBVENTIONS = "user_subventions_data";

function DemandeSubventionPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id_subvention: "",
    numero_titre: "",
    devis_fournisseur_name: "", 
    description: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, id_subvention: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFormData((prev) => ({ ...prev, devis_fournisseur_name: selectedFile.name }));
      toast({
        title: "Fichier sélectionné",
        description: `Fichier: ${selectedFile.name}`,
      });
    } else {
      setFile(null);
      setFormData((prev) => ({ ...prev, devis_fournisseur_name: "" }));
      toast({
        title: "Type de fichier invalide",
        description: "Veuillez sélectionner un fichier PDF.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Fichier manquant",
        description: "Veuillez téléverser le devis fournisseur au format PDF.",
        variant: "destructive",
      });
      return;
    }

    const existingSubventions = JSON.parse(localStorage.getItem(LS_KEY_SUBVENTIONS) || "[]");
    const subventionTypeName = subventionTypes.find(s => s.id === formData.id_subvention)?.name || "N/A";
    
    const newSubvention = { 
      id: Date.now(), 
      ...formData, 
      type_demande: subventionTypeName,
      date_depot: new Date().toISOString(), 
      status: "Déposée",
      reponse: null 
    };
    localStorage.setItem(LS_KEY_SUBVENTIONS, JSON.stringify([...existingSubventions, newSubvention]));
    
    toast({
      title: "Demande de subvention envoyée !",
      description: "Votre demande a été enregistrée avec succès.",
      variant: "default",
      className: "bg-primary text-primary-foreground",
    });
    
    setFormData({
      id_subvention: "",
      numero_titre: "",
      devis_fournisseur_name: "",
      description: "",
    });
    setFile(null);
    if (document.getElementById('devis_fournisseur')) {
      document.getElementById('devis_fournisseur').value = "";
    }
  };

  const inputFields = [
    { id: "numero_titre", name: "numero_titre", label: "Numéro de Titre Foncier/Réquisition", type: "text", placeholder: "Ex: T12345/R", icon: <FileText size={18} className="text-muted-foreground" />, required: true },
  ];

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
            <Award size={28} />
            Demande de Subvention
          </CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous pour soumettre votre demande de subvention. Les champs marqués d'un * sont obligatoires.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="id_subvention" className="text-foreground/80 flex items-center gap-2"><Award size={16} /> Type de Subvention <span className="text-destructive">*</span></Label>
                <Select onValueChange={handleSelectChange} value={formData.id_subvention} name="id_subvention" required>
                  <SelectTrigger id="id_subvention" className="h-11 bg-background/70 border-border focus:border-primary transition-colors">
                    <SelectValue placeholder="Sélectionnez un type de subvention" />
                  </SelectTrigger>
                  <SelectContent>
                    {subventionTypes.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {inputFields.map((field, index) => (
                <motion.div 
                  key={field.id} 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index + 1) * 0.05 }}
                >
                  <Label htmlFor={field.id} className="text-foreground/80 flex items-center gap-2">
                    {field.icon} {field.label} {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="h-11 bg-background/70 border-border focus:border-primary transition-colors"
                    required={field.required}
                  />
                </motion.div>
              ))}
            
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="devis_fournisseur" className="text-foreground/80 flex items-center gap-2">
                  <UploadCloud size={16} /> Devis Fournisseur (PDF) <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center space-x-2">
                    <Input
                        id="devis_fournisseur"
                        name="devis_fournisseur"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="h-11 bg-background/70 border-border focus:border-primary transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                </div>
                {formData.devis_fournisseur_name && <p className="text-sm text-muted-foreground">Fichier sélectionné: {formData.devis_fournisseur_name}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-foreground/80 flex items-center gap-2">
                  <Edit size={16} /> Description de la demande <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez brièvement votre projet et la subvention demandée..."
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px] bg-background/70 border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border bg-muted/30 p-6 md:p-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-auto"
            >
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send size={18} className="mr-2" />
                Soumettre la Demande
              </Button>
            </motion.div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
export default DemandeSubventionPage;