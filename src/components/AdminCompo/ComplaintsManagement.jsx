
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Textarea } from './textarea';
import { toast } from './use-toast';
import { 
  MessageSquare, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Eye
} from 'lucide-react';

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    const savedComplaints = JSON.parse(localStorage.getItem('moussaada_complaints') || '[]');
    // Ajouter des données de démonstration si aucune réclamation n'existe
    if (savedComplaints.length === 0) {
      const demoComplaints = [
        {
          id: 1,
          title: 'Problème de subvention agricole',
          description: 'Ma demande de subvention pour l\'achat de matériel agricole a été refusée sans explication claire. J\'aimerais comprendre les raisons et savoir comment faire appel.',
          userName: 'Ahmed Benali',
          userEmail: 'ahmed.benali@email.com',
          category: 'subvention',
          status: 'pending',
          priority: 'high',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          responses: []
        },
        {
          id: 2,
          title: 'Formation annulée sans préavis',
          description: 'La formation sur les techniques d\'irrigation prévue le 15 novembre a été annulée au dernier moment. Aucune nouvelle date n\'a été proposée.',
          userName: 'Fatima Khelifi',
          userEmail: 'fatima.khelifi@email.com',
          category: 'formation',
          status: 'in_progress',
          priority: 'medium',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          responses: [
            {
              id: 1,
              text: 'Nous avons pris note de votre réclamation. Une nouvelle date sera communiquée prochainement.',
              adminName: 'Administrateur',
              createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: 3,
          title: 'Problème d\'accès à la plateforme',
          description: 'Je n\'arrive pas à me connecter à mon compte depuis une semaine. Le message d\'erreur indique que mon compte est suspendu.',
          userName: 'Mohamed Saidi',
          userEmail: 'mohamed.saidi@email.com',
          category: 'technique',
          status: 'resolved',
          priority: 'low',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          responses: [
            {
              id: 1,
              text: 'Votre compte a été réactivé. Vous pouvez maintenant vous connecter normalement.',
              adminName: 'Administrateur',
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        }
      ];
      setComplaints(demoComplaints);
      saveComplaints(demoComplaints);
    } else {
      setComplaints(savedComplaints);
    }
  };

  const saveComplaints = (complaintsData) => {
    localStorage.setItem('moussaada_complaints', JSON.stringify(complaintsData));
  };

  const updateComplaintStatus = (id, newStatus) => {
    const updatedComplaints = complaints.map(complaint =>
      complaint.id === id ? { ...complaint, status: newStatus, updatedAt: new Date().toISOString() } : complaint
    );
    setComplaints(updatedComplaints);
    saveComplaints(updatedComplaints);
    
    const statusLabels = {
      pending: 'en attente',
      in_progress: 'en cours',
      resolved: 'résolue'
    };
    
    toast({
      title: "Statut mis à jour !",
      description: `La réclamation est maintenant ${statusLabels[newStatus]}.`,
    });
  };

  const handleSendResponse = () => {
    if (!responseText.trim() || !selectedComplaint) return;

    const newResponse = {
      id: Date.now(),
      text: responseText,
      adminName: 'Administrateur',
      createdAt: new Date().toISOString()
    };

    const updatedComplaints = complaints.map(complaint =>
      complaint.id === selectedComplaint.id
        ? {
            ...complaint,
            responses: [...(complaint.responses || []), newResponse],
            status: complaint.status === 'pending' ? 'in_progress' : complaint.status,
            updatedAt: new Date().toISOString()
          }
        : complaint
    );

    setComplaints(updatedComplaints);
    saveComplaints(updatedComplaints);
    setResponseText('');
    setIsResponseDialogOpen(false);
    
    toast({
      title: "Réponse envoyée !",
      description: "Votre réponse a été envoyée à l'utilisateur.",
    });
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'status-approved';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'in_progress': return 'En cours';
      case 'resolved': return 'Résolue';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Gestion des Réclamations</h1>
          <p className="text-gray-600 mt-2">Suivez et répondez aux réclamations des utilisateurs</p>
        </div>
      </motion.div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher une réclamation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-4 h-10 border border-input bg-background rounded-md text-sm min-w-[180px]"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="resolved">Résolues</option>
          </select>
        </div>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {complaints.filter(c => c.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {complaints.filter(c => c.status === 'in_progress').length}
                </p>
                <p className="text-sm text-gray-600">En cours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {complaints.filter(c => c.status === 'resolved').length}
                </p>
                <p className="text-sm text-gray-600">Résolues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{complaints.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Liste des réclamations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4"
      >
        {filteredComplaints.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Aucune réclamation trouvée
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== 'all' ? 'Aucun résultat pour vos critères.' : 'Aucune réclamation pour le moment.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredComplaints.map((complaint, index) => (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-0 shadow-lg card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {complaint.title}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {complaint.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>Par: <strong>{complaint.userName}</strong></span>
                        <span>{new Date(complaint.createdAt).toLocaleDateString('fr-FR')}</span>
                        {complaint.responses && complaint.responses.length > 0 && (
                          <span>{complaint.responses.length} réponse(s)</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                          {getStatusLabel(complaint.status)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                          Priorité {getPriorityLabel(complaint.priority)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir détails
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{complaint.title}</DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-gray-600">{complaint.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Utilisateur:</span>
                                <p>{complaint.userName}</p>
                                <p className="text-gray-500">{complaint.userEmail}</p>
                              </div>
                              <div>
                                <span className="font-medium">Date:</span>
                                <p>{new Date(complaint.createdAt).toLocaleString('fr-FR')}</p>
                              </div>
                            </div>

                            {complaint.responses && complaint.responses.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-3">Réponses</h4>
                                <div className="space-y-3">
                                  {complaint.responses.map(response => (
                                    <div key={response.id} className="bg-gray-50 p-4 rounded-lg">
                                      <p className="text-gray-700 mb-2">{response.text}</p>
                                      <div className="text-xs text-gray-500">
                                        Par {response.adminName} le {new Date(response.createdAt).toLocaleString('fr-FR')}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setIsResponseDialogOpen(true);
                        }}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Répondre
                      </Button>

                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateComplaintStatus(complaint.id, 'in_progress')}
                          disabled={complaint.status === 'in_progress'}
                          className="text-blue-600"
                        >
                          En cours
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                          disabled={complaint.status === 'resolved'}
                          className="text-green-600"
                        >
                          Résolu
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Dialog de réponse */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Répondre à la réclamation</DialogTitle>
          </DialogHeader>
          
          {selectedComplaint && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{selectedComplaint.title}</h4>
                <p className="text-gray-600 text-sm">{selectedComplaint.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Par {selectedComplaint.userName} le {new Date(selectedComplaint.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="response">Votre réponse</Label>
                <Textarea
                  id="response"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Tapez votre réponse ici..."
                  rows={6}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSendResponse} disabled={!responseText.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer la réponse
                </Button>
                <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplaintsManagement;
