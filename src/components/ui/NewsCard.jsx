import React, {useState , useEffect } from 'react';
import {getImage} from '../../services/media';
import { Droplets, Sun, Wind } from 'lucide-react';

const NewsCard = ({ news, index }) => {
  // Weather icon based on news category
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const loadImage = async () => {
      if (news.image && !imageUrls[news.image]) {
        try {
          const url = await getImage(news.image);
          setImageUrls((prev) => ({ ...prev, [news.image]: url }));
        } catch (error) {
          console.error(`Erreur chargement image pour ${news.image}`, error);
          setImageUrls((prev) => ({ ...prev, [news.image]: null }));
        }
      }
    };

    loadImage();
  }, [news.image]);

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-700 hover:shadow-lg"
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-green-500 to-green-400 transform scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      {/* Growth animation overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="h-48 overflow-hidden bg-gray-200">
        <img
          src={imageUrls[news.image]}
          alt={news.titre}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-green-700">
          {news.titre}
        </h3>

        <p className="mb-4 text-gray-600">{news.description}</p>

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


export default NewsCard;
