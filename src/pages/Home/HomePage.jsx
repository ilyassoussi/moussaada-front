
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/Button/button";
import { Users, MessageSquare, ChevronRight, Sparkles, Tractor, TrendingUp, Leaf } from "lucide-react";
import NavBar from '../../components/Header/Navbar';
import Footer from "../../components/Footer/Footer";
import CoverHome from '../../assets/cover-home.jpeg'
import NewsSection from '../../components/ui/NewsSection'

const TestimonialCard = ({ quote, author, role, avatar, index }) => (
  <motion.div
    className="bg-green-50 p-6 rounded-xl shadow-lg relative overflow-hidden"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.15 }}
  >
    <Sparkles className="absolute -top-3 -right-3 text-lime-300 opacity-50 w-16 h-16" />
    <p className="text-gray-700 italic mb-4 relative z-10">"{quote}"</p>
    <div className="flex items-center">
      <img 
        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-lime-400"
        alt={author}
       src="https://images.unsplash.com/photo-1680674497655-49cdf30878ff" />
      <div>
        <h4 className="font-semibold text-green-700">{author}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

const HomePage = () => {

  const testimonials = [
    {
      quote: "Grâce à MOUSSAADA, j'ai pu augmenter mes rendements de 20% en seulement une saison. Leurs conseils sont inestimables !",
      author: "Fatima Alami",
      role: "Agricultrice, Région de Souss",
      avatar: "Portrait d'une agricultrice souriante dans son champ",
    },
    {
      quote: "La plateforme est intuitive et les analyses de sol très précises. Un vrai changement pour ma ferme.",
      author: "Youssef Bennani",
      role: "Agriculteur, Plaine du Saïss",
      avatar: "Portrait d'un jeune agriculteur confiant devant son tracteur",
    },
    {
      quote: "Le support client est exceptionnel. Ils sont toujours là pour répondre à nos questions et nous guider.",
      author: "Amina Kettani",
      role: "Gérante de coopérative agricole",
      avatar: "Portrait d'une femme d'affaires dans un bureau moderne avec des plantes",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 via-lime-50 to-white">
      {/* Hero Section */}
      <NavBar linkColor="text-white" linkHoverColor="hover:text-green-600" />

      <motion.section
        className="relative h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center text-center text-white leaf-pattern overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 -z-6"> 
          {/* absolute w-full h-screen */}
          <img 
            className="w-full h-full object-cover border-4 border-red-500"
            alt="Champ verdoyant et fertile sous un ciel bleu"
            src={CoverHome} />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <motion.div
          className="relative z-10 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
            initial={{ scale: 0.8, opacity: 0}}
            animate={{ scale: 1, opacity: 1}}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <span className="block">Bienvenue sur</span>
            <span className="block bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent mt-2">MOUSSAADA</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-green-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Votre partenaire pour une agriculture innovante, durable et prospère.
            Nous vous aidons à cultiver l'avenir.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-green-900 font-semibold px-8 py-3 rounded-full text-lg shadow-lg transform transition-transform hover:scale-105">
              Découvrir nos solutions
              <Tractor className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronRight className="w-8 h-8 rotate-90 text-white opacity-70" />
        </div>
      </motion.section>

      {/* News Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <NewsSection />
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-lime-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden group">
                <img 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  alt="Équipe MOUSSAADA discutant dans un champ"
                 src="https://images.unsplash.com/photo-1681834913206-cea9d3ec04d6" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-lime-500/20"></div>
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <Leaf className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-lime-300/30 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-green-300/30 rounded-full -z-10 animate-pulse delay-500"></div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-6 flex items-center">
                <Users className="w-8 h-8 mr-3 text-lime-600" /> À Propos de MOUSSAADA
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Chez MOUSSAADA, nous sommes passionnés par l'agriculture et la technologie. Notre mission est de fournir aux agriculteurs les outils et les connaissances nécessaires pour prospérer dans un monde en constante évolution. Nous croyons en une agriculture durable qui nourrit la planète tout en préservant ses ressources.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Forts d'une équipe d'experts agronomes, d'ingénieurs et de spécialistes des données, nous développons des solutions innovantes adaptées aux défis spécifiques de l'agriculture moderne. De l'analyse de sol à la gestion optimisée des cultures, nous sommes à vos côtés à chaque étape.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-green-700">
                    <Tractor className="w-5 h-5 text-lime-600" /> <span>Technologie Avancée</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                    <TrendingUp className="w-5 h-5 text-lime-600" /> <span>Rendements Optimisés</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                    <Leaf className="w-5 h-5 text-lime-600" /> <span>Pratiques Durables</span>
                </div>
                 <div className="flex items-center space-x-2 text-green-700">
                    <Users className="w-5 h-5 text-lime-600" /> <span>Support Expert</span>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transform transition-transform hover:scale-105">
                En savoir plus sur notre équipe
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-3 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 mr-3 text-lime-600" />
              Ce que disent nos agriculteurs
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Découvrez comment MOUSSAADA a aidé des agriculteurs comme vous.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
