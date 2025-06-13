
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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    publishDate: new Date().toISOString().split('T')[0],
    isPublished: true
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    const savedNews = JSON.parse(localStorage.getItem('moussaada_news') || '[]');
    setNews(savedNews);
  };

  const saveNews = (newsData) => {
    localStorage.setItem('moussaada_news', JSON.stringify(newsData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newsItem = {
      id: editingNews ? editingNews.id : Date.now(),
      ...formData,
      createdAt: editingNews ? editingNews.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedNews;
    if (editingNews) {
      updatedNews = news.map(item => item.id === editingNews.id ? newsItem : item);
      toast({
        title: "Actualité modifiée !",
        description: "L'actualité a été mise à jour avec succès.",
      });
    } else {
      updatedNews = [newsItem, ...news];
      toast({
        title: "Actualité créée !",
        description: "La nouvelle actualité a été ajoutée avec succès.",
      });
    }

    setNews(updatedNews);
    saveNews(updatedNews);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      image: '',
      publishDate: new Date().toISOString().split('T')[0],
      isPublished: true
    });
    setEditingNews(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      content: newsItem.content,
      image: newsItem.image,
      publishDate: newsItem.publishDate,
      isPublished: newsItem.isPublished
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      const updatedNews = news.filter(item => item.id !== id);
      setNews(updatedNews);
      saveNews(updatedNews);
      toast({
        title: "Actualité supprimée !",
        description: "L'actualité a été supprimée avec succès.",
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

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Titre de l'actualité"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description courte *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description courte pour l'aperçu"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu complet *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Contenu détaillé de l'actualité"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL de l'image</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
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
                    value={formData.isPublished}
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher une actualité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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
                      <img
                        src={newsItem.image}
                        alt={newsItem.title}
                        className="w-full lg:w-48 h-32 object-cover rounded-lg"
                      />
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
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            newsItem.isPublished 
                              ? 'status-active' 
                              : 'status-inactive'
                          }`}>
                            {newsItem.isPublished ? 'Publié' : 'Brouillon'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(newsItem.publishDate).toLocaleDateString('fr-FR')}
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
                          className={newsItem.isPublished ? 'text-orange-600' : 'text-green-600'}
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
