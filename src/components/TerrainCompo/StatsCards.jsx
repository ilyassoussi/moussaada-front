
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Euro
} from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: 'Demandes Traitées',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'green',
      description: 'Ce mois'
    },
    {
      title: 'Rapports Envoyés',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'blue',
      description: 'Ce mois'
    },
    {
      title: 'Visites Planifiées',
      value: '23',
      change: '+5%',
      trend: 'up',
      icon: Calendar,
      color: 'yellow',
      description: 'Cette semaine'
    },
    {
      title: 'Montant Total',
      value: '2.4M€',
      change: '+15%',
      trend: 'up',
      icon: Euro,
      color: 'purple',
      description: 'Subventions approuvées'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100 text-green-600',
        text: 'text-green-600'
      },
      blue: {
        bg: 'bg-blue-50',
        icon: 'bg-blue-100 text-blue-600',
        text: 'text-blue-600'
      },
      yellow: {
        bg: 'bg-yellow-50',
        icon: 'bg-yellow-100 text-yellow-600',
        text: 'text-yellow-600'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'bg-purple-100 text-purple-600',
        text: 'text-purple-600'
      }
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift ${colorClasses.bg}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses.icon}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                </div>
                
                <div className="flex items-end space-x-2">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <div className={`flex items-center space-x-1 ${colorClasses.text}`}>
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
