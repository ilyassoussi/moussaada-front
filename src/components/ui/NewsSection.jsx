import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sprout } from 'lucide-react';
import NewsCard from './NewsCard';
import { newsData }  from '../data/NewsData';
import NewsSkeleton from './NewsSkeleton';

const NewsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleNews, setVisibleNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [animationState, setAnimationState] = useState('entering');

  const categories = ['all', 'harvest', 'innovation', 'sustainability'];
  const newsPerPage = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = activeCategory === 'all'
      ? newsData
      : newsData.filter(news => news.category === activeCategory);

    const startIdx = currentPage * newsPerPage;
    setVisibleNews(filtered.slice(startIdx, startIdx + newsPerPage));
  }, [activeCategory, currentPage]);

  const handleCategoryChange = (category) => {
    setAnimationState('exiting');
    setTimeout(() => {
      setActiveCategory(category);
      setCurrentPage(0);
      setAnimationState('entering');
      setTimeout(() => {
        setAnimationState('visible');
      }, 500);
    }, 500);
  };

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
    : newsData.filter(news => news.category === activeCategory);

  const maxPages = Math.ceil(filteredNews.length / newsPerPage);

  if (isLoading) {
    return <NewsSkeleton />;
  }

  return (
    <div className="w-full from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center">
          <Sprout className="mr-3 h-8 w-8 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800">Agricultural News</h2>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`group relative overflow-hidden rounded-full px-5 py-2 font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              <span
                className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-600 via-brown-500 to-green-600 ${
                  activeCategory === category ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {activeCategory === category && (
                <span className="absolute -top-1 right-2">
                  <Sprout className="h-3 w-3 animate-pulse text-green-200" />
                </span>
              )}
            </button>
          ))}
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
