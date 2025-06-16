
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-card/50 border-t border-border text-center p-5 text-sm text-muted-foreground" /* Modernized style */
    >
      <span>© {new Date().getFullYear()} {t('footer.copyright')}</span>
    </motion.footer>
  );
}
