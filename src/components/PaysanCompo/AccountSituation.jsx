import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader
} from "./table";
import { Briefcase, CalendarDays, DollarSign, FileClock, Landmark, UserCircle2 } from "lucide-react";

function AccountSituation() {
  const personalInfo = [
    { icon: <UserCircle2 className="text-primary" size={20}/>, label: "NOM ET PRÉNOM", value: "ES-SALLAMY ZAKARIA" },
    { icon: <Briefcase className="text-primary" size={20}/>, label: "MATRICULE", value: "453335" },
    { icon: <Landmark className="text-primary" size={20}/>, label: "ORGANISME EMPLOYEUR", value: "OFFICE NATIONAL DES CHEMINS DE FER (O.N.C.F)" }
  ];

  const accountInfo = [
    { 
      icon: <DollarSign className="text-primary" size={20}/>,
      label: "COTISATION VALIDATION (EN DHS)", 
      value: "0.00",
      rightLabel: "PÉRIODE VALIDÉE (EN MOIS)",
      rightValue: "N/A"
    },
    { 
      icon: <FileClock className="text-primary" size={20}/>,
      label: "COTISATION RACHAT (EN DHS)", 
      value: "0.00",
      rightLabel: "PÉRIODE RACHETÉE (EN MOIS ET JOURS)",
      rightValue: "0 Mois 0 Jours" /* Updated format */
    }
  ];

  const affiliationInfo = [
    { icon: <UserCircle2 className="text-primary" size={20}/>, label: "N° AFFILIATION", value: "969654608" },
    { icon: <Briefcase className="text-primary" size={20}/>, label: "N° ADHÉSION/ÉTAT", value: "353080001" },
    { icon: <CalendarDays className="text-primary" size={20}/>, label: "DATE AFFILIATION", value: "05/12/2018" }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 }}}}
    >
      <Card className="overflow-hidden bg-card/70 backdrop-blur-md">
        <CardHeader className="bg-muted/30 border-b border-border">
          <CardTitle className="text-xl flex items-center gap-2">
            <Briefcase size={24} className="text-primary"/>
            Situation de Compte
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            
            <motion.div variants={itemVariants} custom={0}>
              <h4 className="text-lg font-semibold mb-4 text-primary">Informations Personnelles</h4>
              <Table>
                <TableBody>
                  {personalInfo.map((item, i) => (
                    <TableRow key={i} className="border-b-0 hover:bg-muted/20">
                      <TableCell className="font-medium py-3 pl-0 w-12">
                        <motion.span whileHover={{ scale: 1.2 }}>{item.icon}</motion.span>
                      </TableCell>
                      <TableCell className="font-medium py-3 text-muted-foreground">{item.label} :</TableCell>
                      <TableCell className="py-3 text-right text-foreground">{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
            
            <motion.div variants={itemVariants} custom={1} className="md:border-l md:pl-8 border-border">
              <h4 className="text-lg font-semibold mb-4 text-primary">Détails d'Affiliation</h4>
              <Table>
                <TableBody>
                  {affiliationInfo.map((item, i) => (
                     <TableRow key={i} className="border-b-0 hover:bg-muted/20">
                       <TableCell className="font-medium py-3 pl-0 w-12">
                         <motion.span whileHover={{ scale: 1.2 }}>{item.icon}</motion.span>
                       </TableCell>
                      <TableCell className="font-medium py-3 text-muted-foreground">{item.label} :</TableCell>
                      <TableCell className="py-3 text-right text-foreground">{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>

            <motion.div variants={itemVariants} custom={2} className="md:col-span-2 mt-4 pt-6 border-t border-border">
              <h4 className="text-lg font-semibold mb-4 text-primary">Informations de Cotisation</h4>
               <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {accountInfo.map((item, i) => (
                  <Card key={i} className="bg-muted/20 hover:shadow-primary/20 transition-shadow">
                    <CardContent className="p-4">
                       <div className="flex items-start gap-3 mb-2">
                        <motion.span whileHover={{ rotate: 15 }}>{item.icon}</motion.span>
                        <p className="font-semibold text-foreground">{item.label}</p>
                      </div>
                      <p className="text-2xl font-bold text-primary mb-3">{item.value}</p>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">{item.rightLabel} :</p>
                        <p>{item.rightValue}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AccountSituation;