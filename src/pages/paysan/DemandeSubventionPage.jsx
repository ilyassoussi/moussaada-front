import React,  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "../../components/PaysanCompo/card";
import { Input } from "../../components/PaysanCompo/input";
import { Label } from "../../components/PaysanCompo/label";
import { Button } from "../../components/PaysanCompo/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/PaysanCompo/select";
import { Textarea } from "../../components/PaysanCompo/textarea";
import { useToast } from "../../components/PaysanCompo/use-toast";
import { FileText, UploadCloud, Send, Award, Edit, Info } from "lucide-react";
import { Sidebar } from "../../components/PaysanCompo/sidebar";
import { Header } from "../../components/PaysanCompo/header";
import { Footer } from "../../components/PaysanCompo/footer";
import { Toaster } from "../../components/PaysanCompo/toaster";
import UseVerifyToken from '../../services/useVerifyToken';
import { getAllSubventionNotExpiredYet } from '../../services/api';
import { createDemandeSubvention } from '../../services/api'; 
import { useTranslation } from 'react-i18next';


function DemandeSubventionPage() {
      UseVerifyToken();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id_subvention: "",
    numero_titre: "",
    devis_fournisseur: "", 
    description: "",
  });
  const [file, setFile] = useState(null);
  
  const [subventions, setSubventions] = useState([]);
  const [piecesRequises, setPiecesRequises] = useState([]);
  useEffect(() => {
      // Charger les subventions à l’ouverture de la page
      getAllSubventionNotExpiredYet()
        .then(data => {
          setSubventions(data);
          
        })
        .catch(err => {
          console.error("Erreur lors du chargement des subventions:", err);
        });
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
      setFormData((prev) => ({ ...prev, id_subvention: value }));
      const subvention = subventions.find(s => String(s.id) === value);
      console.log("Subvention sélectionnée:", subvention);
      if (subvention && subvention.piecesRequises && subvention.piecesRequises.length > 0) {
        setPiecesRequises(subvention.piecesRequises);
      } else {
        setPiecesRequises([]);
      }
    };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFormData((prev) => ({ ...prev, devis_fournisseur: selectedFile.name }));
      toast({
        title: "Fichier sélectionné",
        description: `Fichier: ${selectedFile.name}`,
      });
    } else {
      setFile(null);
      setFormData((prev) => ({ ...prev, devis_fournisseur: "" }));
      toast({
        title: "Type de fichier invalide",
        description: "Veuillez sélectionner un fichier PDF.",
        variant: "destructive",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "Fichier manquant",
        description: "Veuillez téléverser le devis fournisseur au format PDF.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Préparer un FormData pour l'envoi
      const dataToSend = new FormData();
      dataToSend.append("id_subvention", formData.id_subvention);
      dataToSend.append("numero_titre", formData.numero_titre);
      dataToSend.append("description", formData.description);
      dataToSend.append("devis_fournisseur", file);

      // Appel API
      await createDemandeSubvention(dataToSend);

      toast({
        title: "Demande de subvention envoyée !",
        description: "Votre demande a été enregistrée avec succès.",
        variant: "default",
        className: "bg-primary text-primary-foreground",
      });

      // Reset formulaire
      setFormData({
        id_subvention: "",
        numero_titre: "",
        devis_fournisseur: "",
        description: "",
      });
      setFile(null);
      if (document.getElementById('devis_fournisseur')) {
        document.getElementById('devis_fournisseur').value = "";
      }
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi",
        description: error?.message || "Une erreur est survenue.",
        variant: "destructive",
      });
    }
  };

  const inputFields = [
    { id: "numero_titre", name: "numero_titre", label: "Numéro de Titre Foncier/Réquisition", type: "text", placeholder: "Ex: T12345/R", icon: <FileText size={18} className="text-muted-foreground" />, required: true },
  ];
  

  return (
    <motion.div className="flex h-screen bg-background text-foreground antialiased">
      <Sidebar />
      <Card className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <CardHeader className="flex-1 overflow-y-auto p-8 space-y-8">
          <CardTitle className="text-2xl flex items-center gap-3 text-primary">
            <Award size={28} />
            {t('demandeSubventionPage.title')}
          </CardTitle>
          <CardDescription>{t('demandeSubventionPage.description')}</CardDescription>
          {piecesRequises.length > 0 && (
            <motion.div className="p-4 mb-6 rounded-md bg-primary/10 border border-primary/30 text-primary flex items-center gap-3">
              <Info size={20} />
              <p className="text-sm font-medium">
                {t('piecesRequises')}: {piecesRequises.join(", ")}
              </p>
            </motion.div>
          )}
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="id_subvention" className="text-foreground/80 flex items-center gap-2">
                  <Award size={16} /> {t('demandeSubventionPage.grantType')} <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={handleSelectChange} value={formData.id_subvention} name="id_subvention" required>
                  <SelectTrigger id="id_subvention" className="h-11 bg-background/70 border-border focus:border-primary transition-colors">
                    <SelectValue placeholder={t('demandeSubventionPage.selectGrantType')} />
                  </SelectTrigger>
                  <SelectContent>
                    {subventions.map((sub) => (
                      <SelectItem key={sub.id} value={String(sub.id)}>
                          {t(`categories.${sub.categorie}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {inputFields.map((field, index) => (
                <motion.div key={field.id} className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: (index + 1) * 0.05 }}>
                  <Label htmlFor={field.id} className="text-foreground/80 flex items-center gap-2">
                    {field.icon} {t('demandeSubventionPage.propertyTitleNumber') || field.label} {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    placeholder={t('demandeSubventionPage.propertyTitleNumberPlaceholder') || field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="h-11 bg-background/70 border-border focus:border-primary transition-colors"
                    required={field.required}
                  />
                </motion.div>
              ))}

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="devis_fournisseur" className="text-foreground/80 flex items-center gap-2">
                  <UploadCloud size={16} /> {t('demandeSubventionPage.supplierQuotePDF')}
                </Label>
                <Input
                  id="devis_fournisseur"
                  name="devis_fournisseur"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="h-11 bg-background/70 border-border focus:border-primary transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {formData.devis_fournisseur && <p className="text-sm text-muted-foreground">{t('demandeSubventionPage.fileSelected')}: {formData.devis_fournisseur}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-foreground/80 flex items-center gap-2">
                  <Edit size={16} /> {t('demandeSubventionPage.requestDescription')} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={t('demandeSubventionPage.requestDescriptionPlaceholder')}
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px] bg-background/70 border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-1 overflow-y-auto p-8 space-y-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="ml-auto">
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send size={18} className="mr-2" />
                {t('demandeSubventionPage.submitRequest')}
              </Button>
            </motion.div>
          </CardFooter>
        </form>

        <Footer />
      </Card>
      <Toaster />
    </motion.div>
  );
};
export default DemandeSubventionPage;