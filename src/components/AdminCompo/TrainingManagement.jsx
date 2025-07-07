
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
  Plus, 
  Edit, 
  Trash2, 
  Users,
  Calendar,
  GraduationCap,
  Search,
  Filter,
  UserPlus,
  Eye
} from 'lucide-react';
import { getAllFormations,
  createFormation,
  updateFormation,
  deleteFormationById,
  getFormationswithoutId
} from '../../services/apiAdmin';
const TrainingManagement = () => {
  const [trainings, setTrainings] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    titreFr: '',
    descriptionFr: '',
    titreAr: '',
    descriptionAr: '',
    intervenant: '',
    date: '',
    time: '',
    lieu: '',
    maxParticipants: 20,
    status: true
  });

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    // const savedTrainings = JSON.parse(localStorage.getItem('moussaada_trainings') || '[]');
    // if (savedTrainings.length === 0) {
    //   const demoTrainings = [
    //     {
    //       id: 1,
    //       title: 'Techniques d\'irrigation moderne',
    //       description: 'Formation sur les nouvelles techniques d\'irrigation pour optimiser l\'utilisation de l\'eau en agriculture.',
    //       intervenant: 'Dr. Karim Benaissa',
    //       date: '2024-12-15',
    //       time: '09:00',
    //       lieu: 'Centre de formation agricole - Alger',
    //       maxParticipants: 25,
    //       status: 'active',
    //       participants: [
    //         { id: 1, name: 'Ahmed Benali', email: 'ahmed.benali@email.com', registeredAt: new Date().toISOString() },
    //         { id: 2, name: 'Fatima Khelifi', email: 'fatima.khelifi@email.com', registeredAt: new Date().toISOString() }
    //       ],
    //       createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    //     },
    //     {
    //       id: 2,
    //       title: 'Gestion des cultures biologiques',
    //       description: 'Apprenez les meilleures pratiques pour la culture biologique et la certification.',
    //       intervenant: 'Mme. Aicha Mansouri',
    //       date: '2024-12-20',
    //       time: '14:00',
    //       lieu: 'Ferme pilote - Blida',
    //       maxParticipants: 15,
    //       status: 'active',
    //       participants: [
    //         { id: 3, name: 'Mohamed Saidi', email: 'mohamed.saidi@email.com', registeredAt: new Date().toISOString() }
    //       ],
    //       createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    //     },
    //     {
    //       id: 3,
    //       title: 'Utilisation des engrais naturels',
    //       description: 'Formation sur la préparation et l\'utilisation des engrais organiques.',
    //       intervenant: 'M. Youcef Hamidi',
    //       date: '2024-11-25',
    //       time: '10:00',
    //       lieu: 'Centre agricole - Oran',
    //       maxParticipants: 30,
    //       status: 'completed',
    //       participants: [
    //         { id: 4, name: 'Nadia Boumediene', email: 'nadia.boumediene@email.com', registeredAt: new Date().toISOString() },
    //         { id: 5, name: 'Rachid Zerrouki', email: 'rachid.zerrouki@email.com', registeredAt: new Date().toISOString() }
    //       ],
    //       createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    //     }
    //   ];
    //   setTrainings(demoTrainings);
    //   saveTrainings(demoTrainings);
    // } else {
    //   setTrainings(savedTrainings);
    // }
    try {
      const data = await getAllFormations();
      setTrainings(data);
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de charger les formations." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formationPayload = {
      titreFr: formData.titreFr,
      descriptionFr: formData.descriptionFr,
      titreAr: formData.titreAr,
      descriptionAr: formData.descriptionAr,
      intervenant: formData.intervenant,
      date: formData.date,
      heure: formData.heure,
      lieu: formData.lieu,
      participantsMax: formData.maxParticipants,
      active: formData.status === true,
    };

    try {
      if (editingTraining) {
        await updateFormation(editingTraining.id, formationPayload);
        toast({ title: "Formation mise à jour", description: "La formation a été mise à jour avec succès." });
      } else {
        await createFormation(formationPayload);
        toast({ title: "Formation créée", description: "La formation a été ajoutée avec succès." });
      }

      loadTrainings(); // refresh depuis l'API
      resetForm();
    } catch (error) {
      toast({ title: "Erreur", description: "Une erreur est survenue lors de l'enregistrement." });
    }
  };

  const resetForm = () => {
    setFormData({
      titreFr: '',
      descriptionFr: '',
      titreAr: '',
      descriptionAr: '',
      intervenant: '',
      date: '',
      time: '',
      lieu: '',
      maxParticipants: 0,
      status: true
    });
    setEditingTraining(null);
    setIsDialogOpen(false);
  };

  const handleEdit = async (training) => {
    const trainingData = await getFormationswithoutId(training.id);
    if (trainingData) {     
      setEditingTraining(trainingData);
      setFormData({
        titreFr: trainingData.traductions[0].titre,
        descriptionFr: trainingData.traductions[0].description,
        titreAr: trainingData.traductions[1].titre,
        descriptionAr: trainingData.traductions[1].description,
        intervenant: trainingData.intervenant,
        date: trainingData.date,
        time: trainingData.heure,
        lieu: trainingData.lieu,
        maxParticipants: trainingData.participantsMax,
        status: trainingData.active
      });
    }
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await deleteFormationById(id);
        toast({ title: "Supprimée", description: "Formation supprimée avec succès." });
        loadTrainings();
      } catch (error) {
        toast({ title: "Erreur", description: "Échec de suppression de la formation." });
      }
    }
  };

  const updateTrainingStatus = async (id, newStatus) => {
    try {
      await updateFormation(id, { status: newStatus });
      toast({ title: "Statut mis à jour", description: `Formation ${getStatusLabel(newStatus)}` });
      loadTrainings();
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de mettre à jour le statut." });
    }
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          training.intervenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          training.lieu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || training.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case true: return 'status-active';
      case false: return 'status-approved';
      case false: return 'status-inactive';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      default: return status;
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
          <h1 className="text-3xl font-bold gradient-text">Gestion des Formations</h1>
          <p className="text-gray-600 mt-2">Organisez et gérez les sessions de formation agricole</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTraining ? 'Modifier la formation' : 'Nouvelle formation'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la formation Fr*</Label>
                <Input
                  id="title"
                  value={formData.titreFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, titreFr: e.target.value }))}
                  placeholder="Ex: Techniques d'irrigation moderne"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description Fr*</Label>
                <Textarea
                  id="description"
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
                  placeholder="Description détaillée de la formation"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titre de la formation Ar*</Label>
                <Input
                  id="title"
                  value={formData.titreAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, titreAr: e.target.value }))}
                  placeholder="Ex: Techniques d'irrigation moderne"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description Ar*</Label>
                <Textarea
                  id="description"
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                  placeholder="Description détaillée de la formation"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="intervenant">Intervenant *</Label>
                  <Input
                    id="intervenant"
                    value={formData.intervenant}
                    onChange={(e) => setFormData(prev => ({ ...prev, intervenant: e.target.value }))}
                    placeholder="Nom de l'intervenant"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lieu">Lieu *</Label>
                  <Input
                    id="lieu"
                    value={formData.lieu}
                    onChange={(e) => setFormData(prev => ({ ...prev, lieu: e.target.value }))}
                    placeholder="Lieu de la formation"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Heure *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.heure}
                    onChange={(e) => setFormData(prev => ({ ...prev, heure: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Participants max</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                  <select
                    id="status"
                    value={formData.status ? 'true' : 'false'}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, status: e.target.value === 'true' }))
                    }
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="true">Active</option>
                    <option value="false">Terminée</option>
                  </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingTraining ? 'Mettre à jour' : 'Créer la formation'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
            placeholder="Rechercher une formation..."
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
            <option value="true">Actives</option>
            <option value="false">Terminées</option>
            <option value="false ">Annulées</option>
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
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {trainings.filter(t => t.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Actives</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {trainings.reduce((total, t) => total + (t.participants?.length || 0), 0)}
                </p>
                <p className="text-sm text-gray-600">Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {trainings.filter(t => t.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Terminées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{trainings.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Liste des formations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4"
      >
        {filteredTrainings.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Aucune formation trouvée
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== 'all' ? 'Aucun résultat pour vos critères.' : 'Commencez par créer votre première formation.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTrainings.map((training, index) => (
            <motion.div
              key={training.id}
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
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {training.title}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {training.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Intervenant: <strong>{training.intervenant}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(training.date).toLocaleDateString('fr-FR')} à {training.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📍 {training.lieu}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>👥 {training.participants?.length || 0}/{training.maxParticipants} participants</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(training.status)}`}>
                          {getStatusLabel(training.status)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTraining(training);
                          setIsParticipantsDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir participants
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(training)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>

                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateTrainingStatus(training.id, false)}
                          disabled={training.status === 'completed'}
                          className="text-green-600"
                        >
                          Terminer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateTrainingStatus(training.id, false)}
                          disabled={training.status === 'cancelled'}
                          className="text-red-600"
                        >
                          Annuler
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(training.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Dialog des participants */}
      <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Participants - {selectedTraining?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedTraining && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{selectedTraining.title}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Date:</span>
                    <p>{new Date(selectedTraining.date).toLocaleDateString('fr-FR')} à {selectedTraining.heure}</p>
                  </div>
                  <div>
                    <span className="font-medium">Lieu:</span>
                    <p>{selectedTraining.lieu}</p>
                  </div>
                  <div>
                    <span className="font-medium">Intervenant:</span>
                    <p>{selectedTraining.intervenant}</p>
                  </div>
                  <div>
                    <span className="font-medium">Participants:</span>
                    <p>{selectedTraining.participants?.length || 0}/{selectedTraining.participantsMax}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Liste des participants</h4>
                {selectedTraining.participants && selectedTraining.participants.length > 0 ? (
                  <div className="space-y-2">
                    {selectedTraining.participants.map(participant => (
                      <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-gray-600">{participant.email}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          Inscrit le {new Date(participant.registeredAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun participant inscrit pour le moment</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingManagement;
