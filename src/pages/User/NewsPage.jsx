import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/PublicPage/ui/button';
import { Input } from '../../components/PublicPage/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/PublicPage/ui/select';
import { ArrowRight, Calendar, Tag, Search, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import NavBar from '../../components/Header/Navbar';
import Footer from "../../components/Footer/Footer";
const mockNews = [
  { id: 1, title: "Lancement du programme 'Jeune Agriculteur Innovant'", date: "2025-06-01", category: "Innovation", excerpt: "Un nouveau programme visant à soutenir les jeunes entrepreneurs agricoles avec des idées novatrices.", imageQuery: "Young farmer with innovative technology" },
  { id: 2, title: "Subventions pour l'irrigation économe en eau", date: "2025-05-28", category: "Subventions", excerpt: "Des aides financières disponibles pour l'installation de systèmes d'irrigation modernes et économes.", imageQuery: "Modern irrigation system in field" },
  { id: 3, title: "Conférence sur l'agriculture biologique et durable", date: "2025-05-20", category: "Événements", excerpt: "Rejoignez-nous pour une conférence passionnante sur les dernières tendances en agriculture biologique.", imageQuery: "Organic farming conference" },
  { id: 4, title: "Nouvelles réglementations phytosanitaires", date: "2025-05-15", category: "Réglementation", excerpt: "Informez-vous sur les dernières mises à jour des réglementations concernant l'utilisation des produits phytosanitaires.", imageQuery: "Farmer inspecting crops for pests" },
  { id: 5, title: "Atelier de formation sur la gestion des sols", date: "2025-05-10", category: "Formation", excerpt: "Participez à notre atelier pratique pour apprendre les meilleures techniques de gestion et de conservation des sols.", imageQuery: "Soil management workshop" },
  { id: 6, title: "Appel à projets pour la diversification agricole", date: "2025-05-05", category: "Projets", excerpt: "Soumettez vos projets de diversification pour bénéficier d'un accompagnement et d'un financement.", imageQuery: "Diverse crops in a field" },
];

const ITEMS_PER_PAGE = 6;

const NewsPage = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, [searchTerm, categoryFilter, currentPage]);

  const categories = [...new Set(mockNews.map(news => news.category))];

  const filteredNews = mockNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || news.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = filteredNews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const NewsCard = ({ news }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-56 overflow-hidden">
        <img  
          alt={news.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
         src="https://images.unsplash.com/photo-1690120225080-e48e3aea49de" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1 text-green-600" />
            <span>{new Date(news.date).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <Tag className="w-3.5 h-3.5 mr-1 text-green-600" />
            <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{news.category}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{news.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{news.excerpt}</p>
        <Button variant="link" className="text-green-600 hover:text-green-700 p-0 self-start mt-auto" asChild>
          <Link to={`/nos-actualites/article${news.id}`}>
            {t('newsPage.readMore')} <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-b from-green-50 via-lime-50 to-white">
       <NavBar linkColor="text-black" linkHoverColor="hover:text-green-600" />
      <div className="container mt-24 mb-24 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Newspaper className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">{t('newsPage.title')}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('newsPage.Subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-10 p-6 bg-white rounded-xl shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label htmlFor="search-news" className="block text-sm font-medium text-gray-700 mb-1">{t('newsPage.Rechercher')}</label>
              <div className="relative">
                <Input
                  id="search-news"
                  type="text"
                  placeholder={t('newsPage.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">{t('newsPage.filterByCategory')}</label>
              <Select
                value={categoryFilter}
                onValueChange={(value) => { setCategoryFilter(value); setCurrentPage(1); }}
              >
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder={t('newsPage.allCategories')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('newsPage.allCategories')}</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-600 mx-auto"></div>
              <p className="mt-4 text-lg font-semibold text-green-700">{t('newsPage.loadingNews')}</p>
            </motion.div>
          ) : (
            paginatedNews.length > 0 ? (
              <motion.div
                key="news-grid"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  animate: { transition: { staggerChildren: 0.1 } }
                }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {paginatedNews.map(news => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="no-news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Newspaper className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <p className="text-xl text-gray-500">{t('newsPage.noNews')}</p>
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && !loading && paginatedNews.length > 0 && (
          <motion.div 
            className="mt-12 flex justify-center items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="hover:bg-green-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm text-gray-700">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="hover:bg-green-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;