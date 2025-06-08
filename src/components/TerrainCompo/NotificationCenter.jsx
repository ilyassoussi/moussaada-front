
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, XCircle, Clock, Eye, Trash2, Filter, BookMarked as MarkAsRead } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

const NotificationCenter = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'validation',
      title: 'Demande DEM-2024-001 Approuvée',
      message: 'La demande de Mohamed Alami pour l\'irrigation goutte à goutte a été approuvée.',
      date: '2024-02-05T10:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'refus',
      title: 'Demande DEM-2024-003 Refusée',
      message: 'La demande de Hassan Benjelloun nécessite des documents complémentaires.',
      date: '2024-02-04T14:15:00',
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'info',
      title: 'Nouveau Formulaire Disponible',
      message: 'Le formulaire de demande de subvention 2024 est maintenant disponible.',
      date: '2024-02-03T09:00:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'validation',
      title: 'Rapport de Visite Reçu',
      message: 'Votre rapport pour la demande DEM-2024-002 a été bien reçu.',
      date: '2024-02-02T16:45:00',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'rappel',
      title: 'Visite Programmée Demain',
      message: 'N\'oubliez pas votre visite chez Aicha Benali demain à 14h00.',
      date: '2024-02-01T18:00:00',
      read: false,
      priority: 'medium'
    }
  ]);

  const getNotificationIcon = (type) => {
    const icons = {
      validation: <CheckCircle className="w-5 h-5 text-green-600" />,
      refus: <XCircle className="w-5 h-5 text-red-600" />,
      info: <Bell className="w-5 h-5 text-blue-600" />,
      rappel: <Clock className="w-5 h-5 text-yellow-600" />
    };
    return icons[type] || icons.info;
  };

  const getNotificationBg = (type, read) => {
    if (read) return 'bg-gray-50';
    
    const backgrounds = {
      validation: 'bg-green-50 border-green-200',
      refus: 'bg-red-50 border-red-200',
      info: 'bg-blue-50 border-blue-200',
      rappel: 'bg-yellow-50 border-yellow-200'
    };
    return backgrounds[type] || 'bg-gray-50';
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'À l\'instant';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return 'Hier';
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Centre de Notifications</h2>
              <p className="text-blue-100">
                {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Toutes les notifications sont lues'}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="secondary"
              onClick={markAllAsRead}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <MarkAsRead className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="unread">Non lues</SelectItem>
              <SelectItem value="validation">Validations</SelectItem>
              <SelectItem value="refus">Refus</SelectItem>
              <SelectItem value="info">Informations</SelectItem>
              <SelectItem value="rappel">Rappels</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border p-6 hover-lift ${getNotificationBg(notification.type, notification.read)}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs">Nouveau</Badge>
                        )}
                      </div>
                      <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDate(notification.date)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'Vous n\'avez aucune notification pour le moment.'
                : `Aucune notification ${filter === 'unread' ? 'non lue' : `de type "${filter}"`} trouvée.`
              }
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationCenter;
