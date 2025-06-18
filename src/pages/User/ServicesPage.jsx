import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/PublicPage/ui/button';
import { Input } from '../../components/PublicPage/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/PublicPage/ui/select';
import { ArrowRight, CalendarDays, CheckSquare, Search, SlidersHorizontal } from 'lucide-react';
import NavBar from '../../components/Header/Navbar';
import Footer from "../../components/Footer/Footer";
import { getAllSubventions } from '../../services/apiSubvention';


const ServiceCard = ({ service }) => {
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 bg-green-600 flex items-center justify-center overflow-hidden">
        <img
          alt={t(`categories.${service.categorie}`)}
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
        <div className="relative z-10 p-2 bg-black/20 rounded-full">
          {service.icon}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{t(`categories.${service.categorie}`)}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description}</p>
        <div className="text-xs text-gray-500 space-y-1.5 mb-4">
          <div className="flex items-center">
            <CheckSquare className="w-3.5 h-3.5 mr-1.5 text-green-600" />
            <span>{t('servicesPage.eligibility')}: {service.conditionsEligibilite}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-green-600" />
            <span>{t('servicesPage.deadline')}: {service.dateFin === "Permanent" ? "Permanent" : new Date(service.dateFin).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        <Button className="w-full mt-auto agricultural-gradient-light hover:opacity-90" asChild>
          <Link to={`/services/subvention/${service.id}`}>
            {t('servicesPage.viewDetails')} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [eligibilityFilter, setEligibilityFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [subventions, setSubventions] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  useEffect(() => {
    const fetchSubventions = async () => {
      setLoading(true);
      try {
        const response = await getAllSubventions();
        setSubventions(response); // suppose que response est un tableau
      } catch (error) {
        console.error('Erreur lors du chargement des subventions :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubventions();
  }, [searchTerm, typeFilter, eligibilityFilter]);

  const serviceTypes = subventions && Array.isArray(subventions) 
  ? [...new Set(subventions.map(s => s.categorie))] 
  : [];

const filteredServices = Array.isArray(subventions)
  ? subventions
      .filter(service => {
        const matchesSearch =
          t(`categories.${service.categorie}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === 'all' || service.categorie === typeFilter;

        const matchesDate = searchDate
          ? new Date(service.dateCreation).toISOString().slice(0, 10) === searchDate
          : true;

        return matchesSearch && matchesType && matchesDate;
      })
      .sort((a, b) => new Date(a.dateCreation) - new Date(b.dateCreation))
  : [];
  
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
          <SlidersHorizontal className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">{t('servicesPage.title')}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('servicesPage.Subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-10 p-6 bg-white rounded-xl shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label htmlFor="search-services" className="block text-sm font-medium text-gray-700 mb-1">{t('newsPage.Rechercher')}</label>
              <div className="relative">
                <Input
                  id="search-services"
                  type="text"
                  placeholder={t('servicesPage.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">{t('servicesPage.filterByType')}</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder={t('servicesPage.allTypes')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('servicesPage.allTypes')}</SelectItem>
                  {serviceTypes.map(type => (
                    <SelectItem key={type} value={type}>{t(`categories.${type}`)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">{t('servicesPage.filterByDate')}</label>
              <Input
                id="date-filter"
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className=""
                min="1900-01-01"
                max="2100-12-31"
              />
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-600 mx-auto"></div>
              <p className="mt-4 text-lg font-semibold text-green-700">{t('common.loading')}</p>
            </motion.div>
          ) : (
            filteredServices.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
              >
                {filteredServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <SlidersHorizontal className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <p className="text-xl text-gray-500">{t('servicesPage.noServices')}</p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;