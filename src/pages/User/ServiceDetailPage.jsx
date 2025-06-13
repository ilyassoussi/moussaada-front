import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../../components/PublicPage/ui/button';
import { ArrowLeft, FileText, Users, ListChecks, CalendarDays, Phone, Printer, Share2, Leaf, Settings2, DollarSign, CheckSquare } from 'lucide-react';
import NavBar from '../../components/Header/Navbar';
import Footer from "../../components/Footer/Footer";

const mockServices = [
  { id: "1", title: "Subvention pour l'Irrigation Goutte-à-Goutte", type: "Irrigation", eligibility: "Petits et moyens agriculteurs", deadline: "2025-09-30", description: "Modernisez votre système d'irrigation pour économiser l'eau et améliorer les rendements. Cette subvention couvre jusqu'à 60% des coûts d'installation.", icon: <Leaf className="w-10 h-10 text-green-600" />, imageQuery: "Close up of drip irrigation emitter on soil",
    detailedDescription: "Le programme vise à encourager l'adoption de techniques d'irrigation efficientes pour une gestion durable des ressources hydriques. Il inclut l'achat et l'installation de systèmes complets (pompes, filtres, conduites, goutteurs).",
    requiredDocuments: ["Copie de la CIN", "Titre de propriété ou contrat de location", "Devis proforma de l'installation", "Plan parcellaire"],
    applicationProcess: ["Dépôt du dossier à la direction provinciale", "Visite de terrain par un technicien", "Validation du dossier par la commission", "Notification de la décision et déblocage des fonds"],
    contact: { name: "Service des Aides", email: "aides.irrigation@agriculture.gov.ma", phone: "05 XX XX XX XX" },
    related: [2, 3] 
  },
  { id: "2", title: "Aide à l'Acquisition de Matériel Agricole", type: "Matériel", eligibility: "Coopératives agricoles", deadline: "2025-10-15", description: "Financez l'achat de tracteurs, semoirs et autres équipements essentiels.", icon: <Settings2 className="w-10 h-10 text-blue-600" />, imageQuery: "Shiny new agricultural equipment in a showroom",
    detailedDescription: "Ce programme supporte les coopératives dans la modernisation de leur parc matériel pour améliorer la productivité et réduire la pénibilité du travail. L'aide peut atteindre 50% du coût d'acquisition.",
    requiredDocuments: ["Statuts de la coopérative", "Liste des membres", "PV de l'AG autorisant l'achat", "Factures proforma du matériel"],
    applicationProcess: ["Soumission de la demande en ligne", "Étude technique et financière", "Décision du comité d'attribution", "Signature de la convention de subvention"],
    contact: { name: "Bureau des Coopératives", email: "coop.materiel@agriculture.gov.ma", phone: "05 YY YY YY YY" },
    related: [1, 4]
   },
   { id: "3", title: "Programme de Formation aux Techniques Bio", type: "Formation", eligibility: "Tous agriculteurs", deadline: "2025-08-31", description: "Apprenez les meilleures pratiques pour une transition réussie vers l'agriculture biologique.", icon: <Users className="w-10 h-10 text-yellow-600" />, imageQuery: "Diverse group of farmers in an outdoor workshop",
    detailedDescription: "Des modules de formation gratuits couvrant la certification bio, la gestion de la fertilité des sols, la lutte biologique contre les ravageurs, et la commercialisation des produits bio.",
    requiredDocuments: ["Formulaire d'inscription", "Justificatif d'activité agricole"],
    applicationProcess: ["Inscription en ligne ou auprès des services de la DPA", "Sélection des candidats", "Participation aux sessions de formation"],
    contact: { name: "Service Formation", email: "formation.bio@agriculture.gov.ma", phone: "05 ZZ ZZ ZZ ZZ" },
    related: [4, 1]
   },
   { id: "4", title: "Soutien à la Certification Biologique", type: "Certification", eligibility: "Exploitations en conversion bio", deadline: "2025-11-30", description: "Obtenez une aide pour couvrir les coûts de certification de vos produits biologiques.", icon: <CheckSquare className="w-10 h-10 text-purple-600" />, imageQuery: "Hand holding a certificate with a green seal",
    detailedDescription: "Cette aide financière vise à alléger le fardeau des coûts liés à l'obtention et au maintien de la certification biologique par un organisme agréé.",
    requiredDocuments: ["Attestation de conversion bio", "Devis de l'organisme certificateur", "Plan de culture"],
    applicationProcess: ["Dépôt de la demande", "Vérification de l'éligibilité", "Octroi de la subvention après certification"],
    contact: { name: "Guichet Bio", email: "certif.bio@agriculture.gov.ma", phone: "05 AA AA AA AA" },
    related: [3, 2]
   },
   { id: "5", title: "Fonds d'urgence pour les aléas climatiques", type: "Urgence", eligibility: "Agriculteurs affectés", deadline: "Permanent", description: "Un soutien financier rapide en cas de sécheresse, inondation ou autres catastrophes naturelles.", icon: <DollarSign className="w-10 h-10 text-red-600" />, imageQuery: "Cracked dry earth under a blazing sun",
    detailedDescription: "Ce fonds est activé en cas d'événements climatiques exceptionnels reconnus officiellement. Il vise à aider les agriculteurs à surmonter les difficultés et à relancer leur activité.",
    requiredDocuments: ["Déclaration de sinistre", "Constat des dégâts", "Justificatifs d'exploitation"],
    applicationProcess: ["Déclaration auprès de la DPA", "Expertise des dégâts", "Calcul de l'indemnisation", "Versement de l'aide"],
    contact: { name: "Cellule de Crise", email: "urgence.climat@agriculture.gov.ma", phone: "05 BB BB BB BB" },
    related: [1,2]
   },
];

const DetailSection = ({ title, icon, children }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
      {icon}
      <span className="ml-3">{title}</span>
    </h2>
    <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700">
      {children}
    </div>
  </motion.div>
);

const ServiceDetailPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);

  useEffect(() => {
    const currentService = mockServices.find(s => s.id === id);
    setService(currentService);
    if (currentService) {
      const related = mockServices.filter(s => currentService.related.includes(s.id));
      setRelatedServices(related);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-green-700">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const handlePrint = () => window.print();
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: service.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Erreur de partage:", error);
      }
    } else {
      alert("La fonction de partage n'est pas supportée sur ce navigateur.");
    }
  };


  return (
    <div className="bg-gray-50">
      <NavBar linkColor="text-black" linkHoverColor="hover:text-green-600" />
      <div className="container mx-auto mt-24 mb-24 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" asChild className="hover:bg-green-50 text-gray-700">
            <Link to="/nos-services">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux services
            </Link>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.section 
          className="relative bg-gradient-to-br from-green-600 to-emerald-700 text-white p-8 md:p-12 rounded-xl shadow-2xl overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-10">
            <img  alt="Abstract pattern for service detail hero" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1610219542098-df1753da93bc" />
          </div>
          <div className="relative z-10 md:flex md:items-center md:space-x-8">
            <div className="flex-shrink-0 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 md:mb-0">
              {service.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{service.title}</h1>
              <p className="text-lg text-green-100 mb-4">{service.description}</p>
              <div className="flex items-center text-sm space-x-6 text-green-50">
                <span className="flex items-center"><CheckSquare className="w-4 h-4 mr-1.5 text-yellow-300" /> {t('servicesPage.eligibility')}: {service.eligibility}</span>
                <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1.5 text-yellow-300" /> {t('servicesPage.deadline')}: {service.deadline === "Permanent" ? "Permanent" : new Date(service.deadline).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <DetailSection title={t('servicesPage.description')} icon={<FileText className="w-6 h-6 text-green-600" />}>
              <p>{service.detailedDescription}</p>
            </DetailSection>

            <DetailSection title={t('servicesPage.eligibility')} icon={<Users className="w-6 h-6 text-green-600" />}>
              <p>Les critères d'éligibilité spécifiques pour cette subvention sont : {service.eligibility}. Des conditions supplémentaires peuvent s'appliquer, veuillez consulter le guide complet ou nous contacter.</p>
            </DetailSection>

            <DetailSection title={t('servicesPage.requiredDocuments')} icon={<ListChecks className="w-6 h-6 text-green-600" />}>
              <ul className="list-disc list-inside space-y-1">
                {service.requiredDocuments.map((doc, index) => <li key={index}>{doc}</li>)}
              </ul>
            </DetailSection>

            <DetailSection title={t('servicesPage.applicationProcess')} icon={<Settings2 className="w-6 h-6 text-green-600" />}>
              <ol className="list-decimal list-inside space-y-2">
                {service.applicationProcess.map((step, index) => <li key={index}>{step}</li>)}
              </ol>
            </DetailSection>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6 sticky top-24">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="w-full agricultural-gradient text-lg mb-4 hover:opacity-90">
                {t('servicesPage.applyNow')}
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handlePrint} className="w-full hover:bg-gray-100">
                  <Printer className="w-4 h-4 mr-2" /> {t('servicesPage.print')}
                </Button>
                <Button variant="outline" onClick={handleShare} className="w-full hover:bg-gray-100">
                  <Share2 className="w-4 h-4 mr-2" /> {t('servicesPage.share')}
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                {t('servicesPage.contactForQuestions')}
              </h3>
              <p className="text-sm text-gray-700 font-medium">{service.contact.name}</p>
              <p className="text-sm text-gray-600">Email: <a href={`mailto:${service.contact.email}`} className="text-green-600 hover:underline">{service.contact.email}</a></p>
              <p className="text-sm text-gray-600">Téléphone: <a href={`tel:${service.contact.phone}`} className="text-green-600 hover:underline">{service.contact.phone}</a></p>
            </motion.div>

            {relatedServices.length > 0 && (
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('servicesPage.relatedSubsidies')}</h3>
                <ul className="space-y-3">
                  {relatedServices.map(related => (
                    <li key={related.id}>
                      <Link to={`/services/subvention/${related.id}`} className="group">
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-md flex items-center justify-center text-green-600 group-hover:bg-green-200">
                            {React.cloneElement(related.icon, {className: "w-5 h-5"})}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 group-hover:text-green-700">{related.title}</p>
                            <p className="text-xs text-gray-500">{related.type}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;