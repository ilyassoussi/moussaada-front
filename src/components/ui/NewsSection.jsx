import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sprout } from 'lucide-react';
import NewsCard from './NewsCard';
import NewsSkeleton from './NewsSkeleton';
import { getAllActualites } from '../../services/apiAdmin';
import { useTranslation } from 'react-i18next';

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleNews, setVisibleNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [animationState, setAnimationState] = useState('entering');
  const { i18n } = useTranslation();

  const categories = ['all', 'harvest', 'innovation', 'sustainability'];
  const newsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllActualites();
        setNewsData(res.data); // ajuster selon backend (peut-être res.data.content)
      } catch (err) {
        console.error('Erreur chargement des actualités :', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [i18n.language]);


  const handlePageChange = (direction) => {
    setAnimationState('exiting');
    setTimeout(() => {
      setCurrentPage(prev => direction === 'next' ? prev + 1 : prev - 1);
      setAnimationState('entering');
      setTimeout(() => {
        setAnimationState('visible');
      }, 500);
    }, 500);
  };

  const filteredNews = activeCategory === 'all'
    ? newsData
    : newsData.filter(news => news.id === activeCategory);

  const maxPages = Math.ceil(filteredNews.length / newsPerPage);

  if (isLoading) return <NewsSkeleton />;

  return (
    <div className="w-full from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center">
          <Sprout className="mr-3 h-8 w-8 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800">Les actualités d'agriculture</h2>
        </div>

        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ${
          animationState === 'entering' ? 'animate-slide-up opacity-0' :
          animationState === 'exiting' ? 'animate-slide-down opacity-0' :
          'opacity-100'
        }`}>
          {visibleNews.map((news, index) => (
            <NewsCard key={news.id} news={news} index={index} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center space-x-4">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 0}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              currentPage === 0
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-white text-green-600 shadow-md hover:bg-green-600 hover:text-white'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="flex h-8 items-center rounded-full bg-white px-4 text-sm font-medium">
            {currentPage + 1} / {maxPages}
          </span>

          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage >= maxPages - 1}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              currentPage >= maxPages - 1
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-white text-green-600 shadow-md hover:bg-green-600 hover:text-white'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
