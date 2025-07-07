import React, { useEffect, useState } from 'react';
import { getAllActualites } from '../../services/apiAdmin'; // ton fichier API
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NewsData = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllActualites(); // API avec ?lang
        setNews(res.data); // ou res.data.content selon la structure de ton backend
      } catch (error) {
        console.error('Erreur lors du chargement des actualités :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Chargement des actualités...</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nos <span className="text-green-600">Actualités</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tenez-vous au courant des dernières nouvelles et innovations agricoles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 space-y-3">
                <span className="text-sm text-green-600 uppercase font-medium">{item.category}</span>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.excerpt}</p>
                <div className="flex justify-between items-center pt-4 text-sm text-gray-500">
                  <span>{item.author}</span>
                  <span>{item.date}</span>
                </div>
                <div className="pt-4">
                  <button className="text-green-600 font-semibold hover:underline inline-flex items-center gap-1">
                    Lire plus
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsData;
