import React from 'react';
import { Droplets, Sun, Wind } from 'lucide-react';

const NewsCard = ({ news, index }) => {
  // Weather icon based on news category
  const WeatherIcon = () => {
    switch (news.category) {
      case 'harvest':
        return <Sun className="text-amber-500" />;
      case 'innovation':
        return <Wind className="text-blue-400" />;
      case 'sustainability':
        return <Droplets className="text-teal-500" />;
      default:
        return <Sun className="text-amber-500" />;
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-700 hover:shadow-lg"
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-green-500 to-green-400 transform scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      {/* Weather icon indicator */}
      <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm">
        <WeatherIcon />
      </div>

      {/* Growth animation overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="h-48 overflow-hidden bg-gray-200">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center space-x-2">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(news.category)}`}>
            {news.category}
          </span>
          <span className="text-xs text-gray-500">{news.date}</span>
        </div>

        <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-green-700">
          {news.title}
        </h3>

        <p className="mb-4 text-gray-600">{news.excerpt}</p>

        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-1 font-medium text-green-600 transition-colors duration-300 hover:text-green-800">
            <span>Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get category color
const getCategoryColor = (category) => {
  switch (category) {
    case 'harvest':
      return 'bg-amber-100 text-amber-800';
    case 'innovation':
      return 'bg-blue-100 text-blue-800';
    case 'sustainability':
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-green-100 text-green-800';
  }
};

export default NewsCard;
