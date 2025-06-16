import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "../../components/PaysanCompo/card";
import { Input } from "../../components/PaysanCompo/input";
import { Label } from "../../components/PaysanCompo/label";
import { Button } from "../../components/PaysanCompo/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/PaysanCompo/select";
import { Textarea } from "../../components/PaysanCompo/textarea";
import { useToast } from "../../components/PaysanCompo/use-toast";
import { MapPin, Home, Mail, Phone, Smartphone, Send, MessageSquarePlus } from "lucide-react";
import { Sidebar } from "../../components/PaysanCompo/sidebar";
import { Header } from "../../components/PaysanCompo/header";
import { Footer } from "../../components/PaysanCompo/footer";
import { Toaster } from "../../components/PaysanCompo/toaster";
import UseVerifyToken from '../../services/useVerifyToken';
import { GetVillePaysan, getAddressePaysan, CreateReclamation } from "../../services/api";
import { useTranslation } from 'react-i18next';

function ReclamationsPage() {
  UseVerifyToken();
  const { t } = useTranslation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    id_ville: "",
    email: "",
    addresse: "",
    telephone_fixe: "",
    gsm: "",
    reclamation: "",
  });

  const [villes, setVilles] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const villesRes = await GetVillePaysan();
        setVilles(villesRes);

        const adresseRes = await getAddressePaysan();
        if (adresseRes) {
          setFormData({
            id_ville: adresseRes.id_ville?.toString() || "",
            addresse: adresseRes.addresse || "",
            email: adresseRes.email || "",
            telephone_fixe: adresseRes.telephone_fixe || "",
            gsm: adresseRes.gsm || "",
          });

          toast({
            title: t("toast.loaded_title"),
            description: t("toast.loaded_description"),
            variant: "default",
          });
        }
      } catch (error) {
        toast({
          title: t("toast.error_title"),
          description: t("toast.error_description"),
          variant: "destructive",
        });
      }
    };

    fetchInitialData();
  }, [toast, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, id_ville: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id_ville, email, addresse, telephone_fixe, gsm, reclamation } = formData;

      await CreateReclamation(id_ville, email, addresse, telephone_fixe, gsm, reclamation);

      toast({
        title: t("toast.success_title"),
        description: t("toast.success_description"),
        variant: "default",
        className: "bg-primary text-primary-foreground",
      });
    } catch (error) {
      toast({
        title: t("toast.error_title"),
        description: error.message || t("toast.error_description"),
        variant: "destructive",
      });
    }
  };

  const inputFields = [
    {
      id: "email",
      name: "email",
      label: t("form.email"),
      type: "email",
      placeholder: t("form.email_placeholder"),
      icon: <Mail size={18} className="text-muted-foreground" />,
      required: true,
    },
    {
      id: "addresse",
      name: "addresse",
      label: t("form.address"),
      type: "text",
      placeholder: t("form.address_placeholder"),
      icon: <Home size={18} className="text-muted-foreground" />,
      required: false,
    },
    {
      id: "telephone_fixe",
      name: "telephone_fixe",
      label: t("form.landline"),
      type: "tel",
      placeholder: t("form.landline_placeholder"),
      icon: <Phone size={18} className="text-muted-foreground" />,
      required: false,
    },
    {
      id: "gsm",
      name: "gsm",
      label: t("form.mobile"),
      type: "tel",
      placeholder: t("form.mobile_placeholder"),
      icon: <Smartphone size={18} className="text-muted-foreground" />,
      required: true,
    },
  ];

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
        <CardHeader className="flex-1 overflow-y-auto p-8 space-y-8">
          <CardTitle className="text-2xl flex items-center gap-3 text-primary">
            <MessageSquarePlus size={28} />
            {t("reclamation.new_title")}
          </CardTitle>
          <CardDescription>
            {t("reclamation.instructions")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="id_ville" className="text-foreground/80 flex items-center gap-2">
                  <MapPin size={16} /> {t("form.city")}
                </Label>
                <Select onValueChange={handleSelectChange} value={formData.id_ville} name="id_ville">
                  <SelectTrigger id="id_ville" className="h-11 bg-background/70 border-border focus:border-primary transition-colors">
                    <SelectValue placeholder={t("form.select_city")} />
                  </SelectTrigger>
                  <SelectContent>
                    {villes.map((ville) => (
                      <SelectItem key={ville.id} value={String(ville.id)}>
                        {ville.ville}
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
                <Label htmlFor="reclamation" className="text-foreground/80 flex items-center gap-2">
                  <MessageSquarePlus size={16} /> {t("form.reclamation")} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="reclamation"
                  name="reclamation"
                  placeholder={t("form.reclamation_placeholder")}
                  value={formData.reclamation}
                  onChange={handleChange}
                  className="min-h-[120px] bg-background/70 border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-1 overflow-y-auto p-8 space-y-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="ml-auto">
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send size={18} className="mr-2" />
                {t("form.submit_reclamation")}
              </Button>
            </motion.div>
          </CardFooter>
        </form>
        <Footer />
      </Card>
      <Toaster />
    </motion.div>
  );
}

export default ReclamationsPage;
