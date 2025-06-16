import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/SubventionsCompo/card";
import { BarChart, CheckCircle, Clock, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";

const kpiData = [
  {
    title: "Demandes en Attente",
    value: "25",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Missions Planifiées",
    value: "12",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Rapports à Valider",
    value: "8",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Agriculteurs Enregistrés",
    value: "150",
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-primary"
      >
        Tableau de Bord
      </motion.h1>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {kpiData.map((kpi, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {kpi.value}
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  +2.5% depuis le mois dernier
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-primary" />
              Statistiques des Demandes
            </CardTitle>
            <CardDescription>
              Aperçu mensuel des demandes de subventions.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center">
            <p className="text-muted-foreground">
              Graphique des statistiques à venir...
            </p>
            {/* Placeholder for a chart component */}
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
            <CardDescription>
              Dernières actions sur la plateforme.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>Demande #1024 approuvée par Gestionnaire A.</span>
              </li>
              <li className="flex items-center text-sm">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                <span>Nouveau rapport soumis pour Mission #56.</span>
              </li>
              <li className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                <span>Demande #1025 en attente d'instruction.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
