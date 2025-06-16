
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../../components/PublicPage/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        className="p-8 md:p-12 bg-white rounded-xl shadow-2xl border border-gray-100 max-w-md w-full"
      >
        <AlertTriangle className="w-20 h-20 md:w-24 md:h-24 text-yellow-400 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          {t('notFound.title', 'Page non trouvée')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('notFound.message', 'Désolé, la page que vous recherchez semble introuvable. Elle a peut-être été déplacée ou supprimée.')}
        </p>
        <Button asChild size="lg" className="agricultural-gradient hover:opacity-90 text-lg">
          <Link to="/">
            <Home className="w-5 h-5 mr-2" />
            {t('notFound.goHome', "Retour à l'accueil")}
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
