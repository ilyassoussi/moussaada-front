
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { 
  FileText, 
  Users, 
  MessageSquare, 
  GraduationCap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalUsers: 0,
    pendingComplaints: 0,
    activeTrainings: 0
  });

  useEffect(() => {
    // Simulation de chargement des statistiques
    const loadStats = () => {
      const newsData = JSON.parse(localStorage.getItem('moussaada_news') || '[]');
      const usersData = JSON.parse(localStorage.getItem('moussaada_users') || '[]');
      const complaintsData = JSON.parse(localStorage.getItem('moussaada_complaints') || '[]');
      const trainingsData = JSON.parse(localStorage.getItem('moussaada_trainings') || '[]');

      setStats({
        totalNews: newsData.length,
        totalUsers: usersData.length,
        pendingComplaints: complaintsData.filter(c => c.status === 'pending').length,
        activeTrainings: trainingsData.filter(t => t.status === 'active').length
      });
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Actualités Publiées',
      value: stats.totalNews,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Utilisateurs Actifs',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Réclamations en Attente',
      value: stats.pendingComplaints,
      icon: MessageSquare,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Formations Actives',
      value: stats.activeTrainings,
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'news',
      title: 'Nouvelle actualité publiée',
      description: 'Programme de subvention 2024',
      time: 'Il y a 2 heures',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'user',
      title: 'Nouvel utilisateur inscrit',
      description: 'Agent de terrain - Région Alger',
      time: 'Il y a 4 heures',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'complaint',
      title: 'Réclamation traitée',
      description: 'Problème de subvention résolu',
      time: 'Il y a 6 heures',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'training',
      title: 'Formation programmée',
      description: 'Techniques d\'irrigation moderne',
      time: 'Il y a 1 jour',
      icon: GraduationCap,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Tableau de Bord</h1>
          <p className="text-gray-600 mt-2">Vue d'ensemble de la plateforme MOUSSAADA</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
        </div>
      </motion.div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    +12% ce mois
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activités récentes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Activités Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions rapides */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-4 text-left rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Nouvelle Actualité</p>
                    <p className="text-sm text-blue-600">Publier une actualité</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 text-left rounded-lg bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Ajouter Utilisateur</p>
                    <p className="text-sm text-green-600">Créer un compte</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 text-left rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800">Créer Formation</p>
                    <p className="text-sm text-purple-600">Nouvelle session</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;
