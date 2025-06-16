
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Textarea } from './textarea';
import { toast } from './use-toast';
import dayjs from "dayjs";
import {
  getAllActualites,
  createActualite,
  updateActualite,
  deleteActualite,
  getActualitesWithoutLangId,
} from '../../services/apiAdmin';
import { getImage } from '../../services/media';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  FileText,
  Search
} from 'lucide-react';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageUrls, setImageUrls] = useState({});
  const [searchDate, setSearchDate] = useState("");
  const [formData, setFormData] = useState({
    titleFr: '',
    titleAr: '',
    descriptionFr: '',
    descriptionAr: '',
    image: '',
    publishDate: new Date().toISOString().split('T')[0],
    isPublished: true
  });

  // useEffect pour charger les actualités UNE FOIS au montage
  useEffect(() => {
    fetchNewsFromAPI(); // cette fonction va mettre à jour `news`
  }, []); // ✅ dépendance vide

  // useEffect pour charger les images quand `news` change
  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      const urls = {};

      const promises = news.map(async (item) => {
        if (item.image && !imageUrls[item.image]) {
          try {
            const url = await getImage(item.image);
            urls[item.image] = url;
          } catch {
            urls[item.image] = null;
          }
        }
      });

      await Promise.all(promises);

      if (isMounted && Object.keys(urls).length > 0) {
        setImageUrls((prev) => ({ ...prev, ...urls }));
      }
    };

    if (news.length > 0) {
      loadImages();
    }

    return () => {
      isMounted = false;
    };
  }, [news]);

  const fetchNewsFromAPI = async () => {
    try {
      const response = await getAllActualites();
      setNews(response.data);
      console.log(response.data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les actualités.",
      });
    }
  };


  const loadNews = () => {
    const savedNews = JSON.parse(localStorage.getItem('moussaada_news') || '[]');
    setNews(savedNews);
  };

  const saveNews = (newsData) => {
    localStorage.setItem('moussaada_news', JSON.stringify(newsData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      titreFr: formData.titleFr,
      titreAr: formData.titleAr, // Ajoute si nécessaire
      descriptionFr: formData.descriptionFr,
      descriptionAr: formData.descriptionAr, // Ajoute si nécessaire
      isActive: formData.isPublished,
      image: formData.image, // Si tu ajoutes un champ de type `file`
    };

    try {
      if (editingNews) {
        await updateActualite(editingNews.id, payload);
        toast({
          title: "Actualité modifiée !",
          description: "L'actualité a été mise à jour avec succès.",
        });
      } else {
        await createActualite(payload);
        toast({
          title: "Actualité créée !",
          description: "La nouvelle actualité a été ajoutée avec succès.",
        });
      }

      fetchNewsFromAPI(); // Refresh depuis API
      resetForm();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'actualité.",
      });
    }
  };


  const resetForm = () => {
    setFormData({
      titreFr: '',
      titreAr: '', // Ajoute si nécessaire
      descriptionFr: '',
      descriptionAr: '', // Ajoute si nécessaire
      isActive: true,
      image: '',
    });
    setEditingNews(null);
    setIsDialogOpen(false);
  };

const handleEdit = async (newsItem) => {
  try {
    // Appelle l'API avec l'id
    const actualiteData = await getActualitesWithoutLangId(newsItem.id);

    // Mets à jour le formulaire avec les données reçues
    setFormData({
      titleFr: actualiteData.traductions[0].titre || '',
      titleAr: actualiteData.traductions[1].titre || '',
      descriptionFr: actualiteData.traductions[0].description || '',
      descriptionAr: actualiteData.traductions[1].description || '',
      image: '',
      publishDate: actualiteData.date_creation ? new Date(actualiteData.date_creation).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      isPublished: actualiteData.isActive ?? true,
    });

    setEditingNews(newsItem);
    setIsDialogOpen(true);
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Impossible de récupérer l'actualité pour modification.",
    });
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) return;

    try {
      await deleteActualite(id);
      toast({
        title: "Actualité supprimée !",
        description: "L'actualité a été supprimée avec succès.",
      });
      fetchNewsFromAPI();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'actualité.",
      });
    }
  };

  const togglePublish = (id) => {
    const updatedNews = news.map(item =>
      item.id === id ? { ...item, isPublished: !item.isPublished } : item
    );
    setNews(updatedNews);
    saveNews(updatedNews);

    const newsItem = updatedNews.find(item => item.id === id);
    toast({
      title: newsItem.isPublished ? "Actualité publiée !" : "Actualité dépubliée !",
      description: `L'actualité a été ${newsItem.isPublished ? 'publiée' : 'dépubliée'} avec succès.`,
    });
  };

  const sortedNews = [...news].sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));

  const filteredNews = sortedNews.filter(item =>
    (
      item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (
      !searchDate || dayjs(item.date_creation).format("YYYY-MM-DD") === searchDate
    )
  );

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Gestion des Actualités</h1>
          <p className="text-gray-600 mt-2">Créez et gérez les actualités agricoles</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => resetForm()}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Actualité
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? 'Modifier l\'actualité' : 'Nouvelle actualité'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titleFr">Titre (Français)</Label>
                  <Input
                    id="titleFr"
                    value={formData.titleFr}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
                    placeholder="Titre en français"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titleAr">Titre (Arabe)</Label>
                  <Input
                    id="titleAr"
                    value={formData.titleAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                    placeholder="Titre en arabe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="descriptionFr">Description (Français)</Label>
                  <Textarea
                    id="descriptionFr"
                    value={formData.descriptionFr}
                    onChange={(e) => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
                    placeholder="Description courte en français"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descriptionAr">Description (Arabe)</Label>
                  <Textarea
                    id="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                    placeholder="Description courte en arabe"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Date de publication</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isPublished">Statut</Label>
                  <select
                    id="isPublished"
                    value={formData.isPublished ? 'true' : 'false'}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.value === 'true' }))}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="true">Publié</option>
                    <option value="false">Brouillon</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingNews ? 'Mettre à jour' : 'Créer l\'actualité'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Barre de recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          {/* Champ de recherche par mot-clé */}
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher une actualité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Champ de recherche par date */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
              Filtrer par date :
            </label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>
      </motion.div>


      {/* Liste des actualités */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6"
      >
        {filteredNews.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Aucune actualité trouvée
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'Aucun résultat pour votre recherche.' : 'Commencez par créer votre première actualité.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNews.map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    {newsItem.image ? (
                      imageUrls[newsItem.image] ? (
                        <img
                          src={imageUrls[newsItem.image]}
                          alt={newsItem.titreFr}
                          className="w-full lg:w-48 h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full lg:w-48 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                          Chargement...
                        </div>
                      )
                    ) : (
                      <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                    )}


                    {/* Contenu */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {newsItem.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2">
                            {newsItem.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${newsItem.is_active
                            ? 'status-active'
                            : 'status-inactive'
                            }`}>
                            {newsItem._active ? 'Publié' : 'Brouillon'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(newsItem.date_creation).toLocaleDateString('fr-FR')}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(newsItem)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePublish(newsItem.id)}
                          className={newsItem.is_active ? 'text-orange-600' : 'text-green-600'}
                        >
                          {newsItem.isPublished ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-1" />
                              Dépublier
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-1" />
                              Publier
                            </>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(newsItem.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Supprimer
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
    </div>
  );
};

export default NewsManagement;
