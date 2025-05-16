
import React from "react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-card/50 border-t border-border text-center p-5 text-sm text-muted-foreground" /* Modernized style */
    >
      <span>© {new Date().getFullYear()} RCAR - Propulsé par la Caisse de Dépôt et de Gestion. Tous droits réservés.</span>
    </motion.footer>
  );
}
