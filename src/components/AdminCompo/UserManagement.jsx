
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { useToast } from './use-toast';
import { Search, User, CheckCircle, XCircle, Eye, Filter, Download } from 'lucide-react';
import { Helmet } from 'react-helmet';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        identite: 'AB123456',
        nom: 'Ahmed Ben Ali',
        email: 'ahmed.benali@email.com',
        telephone: '+212 6 12 34 56 78',
        region: 'Casablanca-Settat',
        typeActivite: 'Céréales',
        dateInscription: '2024-01-15',
        statut: 'en_attente',
        superficie: '25 hectares'
      },
      {
        id: 2,
        identite: 'CD789012',
        nom: 'Fatima El Mansouri',
        email: 'fatima.mansouri@email.com',
        telephone: '+212 6 87 65 43 21',
        region: 'Marrakech-Safi',
        typeActivite: 'Arboriculture',
        dateInscription: '2024-01-20',
        statut: 'actif',
        superficie: '15 hectares'
      },
      {
        id: 3,
        identite: 'EF345678',
        nom: 'Mohamed Ouali',
        email: 'mohamed.ouali@email.com',
        telephone: '+212 6 55 44 33 22',
        region: 'Fès-Meknès',
        typeActivite: 'Maraîchage',
        dateInscription: '2024-01-25',
        statut: 'suspendu',
        superficie: '8 hectares'
      },
      {
        id: 4,
        identite: 'GH901234',
        nom: 'Aicha Benkirane',
        email: 'aicha.benkirane@email.com',
        telephone: '+212 6 99 88 77 66',
        region: 'Rabat-Salé-Kénitra',
        typeActivite: 'Élevage',
        dateInscription: '2024-02-01',
        statut: 'en_attente',
        superficie: '50 hectares'
      }
    ];
    
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.identite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.statut === filterStatus);
    }
    
    setFilteredUsers(filtered);
  }, [searchTerm, filterStatus, users]);

  const handleActivateAccount = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, statut: 'actif' } : user
    ));
    toast({
      title: "Compte activé",
      description: "Le compte a été activé avec succès.",
    });
  };

  const handleSuspendAccount = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, statut: 'suspendu' } : user
    ));
    toast({
      title: "Compte suspendu",
      description: "Le compte a été suspendu.",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'suspendu': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'actif': return 'Actif';
      case 'en_attente': return 'En attente';
      case 'suspendu': return 'Suspendu';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Back Office - Gestion des Comptes | AgriMaroc</title>
        <meta name="description" content="Interface d'administration pour gérer et activer les comptes des paysans marocains." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gestion des Comptes Paysans
          </h1>
          <p className="text-lg text-gray-600">
            Recherchez et gérez les comptes des agriculteurs marocains
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-effect rounded-xl p-6 card-shadow mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher par identité, nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-green-200 focus:border-green-500"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="actif">Actif</option>
                  <option value="en_attente">En attente</option>
                  <option value="suspendu">Suspendu</option>
                </select>
              </div>
              
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Users Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-green-500"
                        onClick={() => setSelectedUser(user)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 agricultural-gradient rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.nom}</h3>
                          <p className="text-sm text-gray-600">ID: {user.identite}</p>
                          <p className="text-sm text-gray-500">{user.region}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(user.statut)}>
                          {getStatusLabel(user.statut)}
                        </Badge>
                        
                        <div className="flex space-x-2">
                          {user.statut === 'en_attente' && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActivateAccount(user.id);
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          
                          {user.statut === 'actif' && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSuspendAccount(user.id);
                              }}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(user);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
                  <p className="text-gray-500">Essayez de modifier vos critères de recherche.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* User Details Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-24"
            >
              {selectedUser ? (
                <Card className="p-6 card-shadow">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 agricultural-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedUser.nom}</h3>
                      <Badge className={`mt-2 ${getStatusColor(selectedUser.statut)}`}>
                        {getStatusLabel(selectedUser.statut)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Identité</label>
                        <p className="text-gray-900 font-medium">{selectedUser.identite}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900">{selectedUser.email}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Téléphone</label>
                        <p className="text-gray-900">{selectedUser.telephone}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Région</label>
                        <p className="text-gray-900">{selectedUser.region}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Type d'activité</label>
                        <p className="text-gray-900">{selectedUser.typeActivite}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Superficie</label>
                        <p className="text-gray-900">{selectedUser.superficie}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date d'inscription</label>
                        <p className="text-gray-900">{new Date(selectedUser.dateInscription).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      {selectedUser.statut === 'en_attente' && (
                        <Button
                          onClick={() => handleActivateAccount(selectedUser.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Activer
                        </Button>
                      )}
                      
                      {selectedUser.statut === 'actif' && (
                        <Button
                          variant="destructive"
                          onClick={() => handleSuspendAccount(selectedUser.id)}
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Suspendre
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 text-center card-shadow">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez un utilisateur</h3>
                  <p className="text-gray-500">Cliquez sur un utilisateur pour voir ses détails.</p>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
