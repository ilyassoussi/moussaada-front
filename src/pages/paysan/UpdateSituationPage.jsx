
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "../../components/PaysanCompo/card";
import { Input } from "../../components/PaysanCompo/input";
import { Label } from "../../components/PaysanCompo/label";
import { Button } from "../../components/PaysanCompo/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/PaysanCompo/select";
import { useToast } from "../../components/PaysanCompo/use-toast";
import { MapPin, Home, Landmark, Mail, Phone, Smartphone, Save, Info } from "lucide-react";
import { Sidebar } from "../../components/PaysanCompo/sidebar";
import { Header } from "../../components/PaysanCompo/header";
const cities = [
  { id: 1, name: "Casablanca" },
  { id: 2, name: "Rabat" },
  { id: 3, name: "Marrakech" },
  { id: 4, name: "Fès" },
  { id: 5, name: "Tanger" },
];

const LS_KEY_SITUATION = "user_situation_data";

function UpdateSituationPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id_ville: "",
    addresse: "",
    quartier: "",
    code_postal: "",
    email: "",
    telephone_fixe: "",
    gsm: "",
  });
  const [hasExistingData, setHasExistingData] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(LS_KEY_SITUATION);
    if (storedData) {
      setFormData(JSON.parse(storedData));
      setHasExistingData(true);
      toast({
        title: "Données existantes chargées",
        description: "Vos informations précédemment sauvegardées ont été chargées.",
        variant: "default",
      });
    }
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, id_ville: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(LS_KEY_SITUATION, JSON.stringify(formData));
    setHasExistingData(true);
    toast({
      title: "Mise à jour réussie !",
      description: "Vos informations de situation ont été sauvegardées localement.",
      variant: "default",
      className: "bg-primary text-primary-foreground",
    });
  };

  const inputFields = [
    { id: "addresse", name: "addresse", label: "Adresse", type: "text", placeholder: "Ex: 123 Rue Annasr", icon: <Home size={18} className="text-muted-foreground" /> },
    { id: "quartier", name: "quartier", label: "Quartier", type: "text", placeholder: "Ex: Hay Salam", icon: <MapPin size={18} className="text-muted-foreground" /> },
    { id: "code_postal", name: "code_postal", label: "Code Postal", type: "number", placeholder: "Ex: 20000", icon: <Landmark size={18} className="text-muted-foreground" /> },
    { id: "email", name: "email", label: "Email", type: "email", placeholder: "Ex: nom.prenom@example.com", icon: <Mail size={18} className="text-muted-foreground" /> },
    { id: "telephone_fixe", name: "telephone_fixe", label: "Téléphone Fixe", type: "tel", placeholder: "Ex: 0522 XX XX XX", icon: <Phone size={18} className="text-muted-foreground" /> },
    { id: "gsm", name: "gsm", label: "GSM", type: "tel", placeholder: "Ex: 0661 XX XX XX", icon: <Smartphone size={18} className="text-muted-foreground" /> },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground antialiased">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 p-[100px]"
        >
          <Card className="overflow-hidden bg-card/80 backdrop-blur-md shadow-xl">
            <CardHeader className="bg-muted/30 border-b border-border">
              <CardTitle className="text-2xl flex items-center gap-3 text-primary">
                <Info size={28} />
                Mise à Jour de la Situation
              </CardTitle>
              <CardDescription>
                Modifiez vos informations personnelles et de contact. Les données sont sauvegardées localement.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 md:p-8 space-y-6">
                {hasExistingData && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 mb-6 rounded-md bg-primary/10 border border-primary/30 text-primary flex items-center gap-3"
                  >
                    <Info size={20} />
                    <p className="text-sm font-medium">
                      Des données existantes ont été chargées. Vous pouvez les modifier ci-dessous.
                    </p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="id_ville" className="text-foreground/80 flex items-center gap-2"><MapPin size={16} /> Ville</Label>
                    <Select onValueChange={handleSelectChange} value={formData.id_ville} name="id_ville">
                      <SelectTrigger id="id_ville" className="h-11 bg-background/70 border-border focus:border-primary transition-colors">
                        <SelectValue placeholder="Sélectionnez votre ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={String(city.id)}>
                            {city.name}
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
                      <Label htmlFor={field.id} className="text-foreground/80 flex items-center gap-2">{field.icon} {field.label}</Label>
                      <Input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="h-11 bg-background/70 border-border focus:border-primary transition-colors"
                        required={field.name === "email" || field.name === "gsm"}
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-border bg-muted/30 p-6 md:p-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-auto"
                >
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save size={18} className="mr-2" />
                    Sauvegarder les Modifications
                  </Button>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
export default UpdateSituationPage;