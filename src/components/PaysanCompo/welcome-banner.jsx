
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function WelcomeBanner({ name }) {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl shadow-2xl group" /* Enhanced shadow and rounded corners */
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="absolute inset-0 z-0">
        <img  
          alt="Fond abstrait de technologie moderne" 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
         src="https://images.unsplash.com/photo-1688309917081-8a27311be5b1" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/50 backdrop-blur-sm"></div> {/* Gradient Overlay */}
      </div>
      
      <div className="relative z-10 p-10 text-primary-foreground"> {/* Increased padding */}
        <motion.h1 
          className="text-4xl font-bold mb-2 tracking-tight" /* Larger, tighter tracking */
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('welcomeBanner.welcome')}
        </motion.h1>
        <motion.h2 
          className="text-2xl font-medium text-primary-foreground/90" /* Slightly muted secondary text */
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {name}
        </motion.h2>
        <motion.div 
          className="w-28 h-1.5 bg-accent mt-4 mb-6 rounded-full" /* Accent color, rounded */
          initial={{ width: 0 }}
          animate={{ width: "7rem" }}
          transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
        />
        <motion.p 
          className="text-sm text-primary-foreground/80 max-w-md mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {t('welcomeBanner.description')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button size="lg" variant="secondary" className="group bg-accent hover:bg-accent/90 text-primary-foreground">
            {t('welcomeBanner.exploreServices')}
            <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
