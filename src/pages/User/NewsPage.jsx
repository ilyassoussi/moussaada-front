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
import {getAllActualites} from '../../services/apiAdmin';
import {getImage} from '../../services/media';

const ITEMS_PER_PAGE = 6;

const NewsPage = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actualites, setActualites] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, [searchTerm,currentPage]);

  useEffect(() => {
    fetchNewsFromAPI();
  }, []);

  useEffect(() => {
  const loadImages = async () => {
    const urls = {};
    const promises = actualites.map(async (item) => {
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
    if (Object.keys(urls).length > 0) {
      setImageUrls((prev) => ({ ...prev, ...urls }));
    }
  };

  if (actualites.length > 0) {
    loadImages();
  }
}, [actualites]);

  const fetchNewsFromAPI = async () => {
    try {
      const response = await getAllActualites(); // Appel à ton API
      setActualites(response.data); // stocker la réponse dans le state
    } catch (error) {
      console.error("Erreur lors du chargement des actualités :", error);
    }
  };
  const categories = [...new Set(actualites.map(news => news.titre))];

  const filteredNews = actualites
    .filter(news => {
      const matchesSearch =
        news.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDate = !searchDate || new Date(news.date_creation).toISOString().slice(0, 10) === searchDate;

      return matchesSearch && matchesDate;
    })
    .sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation)); // tri décroissant par date


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
          alt={news.titre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={imageUrls[news.image] || "/fallback.jpg"} // fallback si image non chargée
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1 text-green-600" />
            <span>{new Date(news.date_creation).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <Tag className="w-3.5 h-3.5 mr-1 text-green-600" />
            {/* <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{news.category}</span> */}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{news.tittre}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{news.description}</p>
        <Button variant="link" className="text-green-600 hover:text-green-700 p-0 self-start mt-auto" asChild>
          <Link to={`/nos-actualites/article-${news.id}`}>
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
  <label htmlFor="search-date" className="block text-sm font-medium text-gray-700 mb-1">Rechercher par date</label>
  <input
    type="date"
    id="search-date"
    value={searchDate}
    onChange={(e) => { setSearchDate(e.target.value); setCurrentPage(1); }}
    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
  />
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