
import {React , useContext} from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "./table";
import { Briefcase, CalendarDays, Landmark, Mail, Phone, UserCircle2 } from "lucide-react";
import { UserContext } from '../../context/UserContext';
import { TerreContext } from '../../context/TerreContext';
import { useTranslation } from 'react-i18next';

export function AccountSituation() {
  const { t } = useTranslation();
  const { userInfo } = useContext(UserContext);
  const { terreInfo } = useContext(TerreContext);

  const dateISO = userInfo?.date_de_naissance;

  const dateObj = new Date(dateISO);
  const formattedDate = dateObj.toLocaleDateString('fr-FR'); // format français jour/mois/année

const personalInfo = [
  { icon: <UserCircle2 className="text-primary" size={20} />, label: t('accountSituation.lastNameAndFirstName'), value: userInfo?.nometprenom },
  { icon: <Briefcase className="text-primary" size={20} />, label: t('accountSituation.identite'), value: userInfo?.identite },
];


  // const TerreInfo = [
  //   { 
  //     icon: <DollarSign className="text-primary" size={20}/>,
  //     label: "Valeur Terre (EN DHS)", 
  //     value: "1 500 0000.00",
  //     rightLabel: "PÉRIODE VALIDÉE (EN MOIS)",
  //     rightValue: "N/A"
  //   }
    
  // ];

  const affiliationInfo = [
    { icon: <Phone className="text-primary" size={20}/>, label: t('updateSituationPage.mobile'), value: userInfo?.phone },
    { icon: <Mail className="text-primary" size={20}/>, label: t('updateSituationPage.email'), value: userInfo?.mail },
    { icon: <CalendarDays className="text-primary" size={20}/>, label: t('accountSituation.datenaissance'), value: formattedDate }
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
            {t('accountSituation.title')}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            
            <motion.div variants={itemVariants} custom={0}>
              <h4 className="text-lg font-semibold mb-4 text-primary">{t('accountSituation.personalInfo')}</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-primary">{t('accountSituation.detailpersonalInfo')}</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-primary">{t('accountSituation.landInfo')}</h4>
               <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {terreInfo?.length > 0 ? (
                    terreInfo.map((terre, i) => (
                      <Card key={terre.id || i} className="bg-muted/20 hover:shadow-primary/20 transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-2">
                            <motion.span whileHover={{ rotate: 15 }}>
                              <Landmark className="text-primary" size={20} />
                            </motion.span>

                            <p className="font-semibold text-foreground">
                              {terre.numeroTitre || t('accountSituation.notApplicable')}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex justify-between font-medium">
                              <p>{t('accountSituation.owner')} :</p>
                              <span>{terre.proprietaires.nomComplet}</span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex justify-between font-medium">
                                <p>{t('accountSituation.location')} :</p>
                                <span>{terre.localisation}</span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex justify-between font-medium">
                             <p>{t('accountSituation.area')} :</p>
  <span>{terre.superficieM2 ? `${terre.superficieM2} ha` : t('accountSituation.notApplicable')}</span>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground">
<div className="flex justify-between font-medium">
  <p>{t('accountSituation.registrationDate')} :</p>
  <span>{terre.dateEnregistrement ? new Date(terre.dateEnregistrement).toLocaleDateString('fr-FR') : t('accountSituation.notApplicable')}</span>
</div>
                          </div>

                          <div className="text-sm text-muted-foreground">
<div className="flex justify-between font-medium">
  <p>{t('accountSituation.inDispute')} :</p>
  <span>{terre.enLitige ? t('accountSituation.yes') : t('accountSituation.no')}</span>
</div>
                          </div>

                          <div className="text-sm text-muted-foreground">
<div className="flex justify-between font-medium">
  <p>{t('accountSituation.mortgaged')} :</p>
  <span>{terre.hypothequee ? t('accountSituation.yes') : t('accountSituation.no')}</span>
</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-muted-foreground">{t('accountSituation.noLandFound')}</p>
                  )}
              </div>
            </motion.div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
