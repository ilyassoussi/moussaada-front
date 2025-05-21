
import React from "react";
import { cn } from "./utils";
import { motion } from "framer-motion";
import iconArmerie from '../../assets/ArmoiriesduMaroc.svg'
import {
  LayoutGrid,
  Edit3,
  Calendar,
  Award,
  MessageCircle,
  ListChecks,
  Settings,
  LogOut,
  FilePlus
} from 'lucide-react';
import { logout } from '../../services/api';

const menuItems = [
  { icon: <LayoutGrid size={20} />, label: "Mon compte", href: "/mon-compte"},
  { icon: <Edit3 size={20} />, label: "Mise à jour situation", href: "/mise-a-jour-situation"},
  { icon: <Calendar size={20} />, label: "Prise de rendez-vous", href: "/prise-de-rendez-vous"},
  { icon: <Award size={20} />, label: "Demande de Subventions", href: "/demande-subventions"},
  { icon: <FilePlus size={20} />, label: "Suivi des Subventions", href: "/suivi-subventions"},
  { icon: <MessageCircle size={20} />, label: "Réclamations", href: "/reclamations"},
  { icon: <ListChecks size={20} />, label: "Suivi des réclamations", href: "/suivi-reclamations"}
];



const bottomMenuItems = [
  { icon: <Settings size={20} />, label: "Paramètres", href: "#" },
  { 
    icon: <LogOut size={20} />, 
    label: "Déconnexion", 
    href: "#", // <-- Met un href vide ou # ici pour éviter rechargement
    onClick: async (e) => {
      e.preventDefault(); // bloque la navigation
      try {
        await logout();
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        console.error("Erreur logout:", error);
      }
    }
  },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Mon compte");

  return (
    <motion.div 
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-full w-72 bg-card text-card-foreground flex flex-col justify-between shadow-2xl" /* Increased width and shadow */
    >
      <div>
        <div className="p-6 flex items-center space-x-3">
          <img 
            src={iconArmerie} 
            alt="CNRA RCAR Logo" 
            className="h-10" /* Slightly smaller logo */
          />
          <span className="font-semibold text-xl">Moussaada</span>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
                activeItem === item.label
                  ? "bg-primary text-primary-foreground shadow-md scale-105" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              whileHover={{ scale: activeItem !== item.label ? 1.05 : 1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-4">{item.icon}</span>
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <nav className="space-y-2">
          {bottomMenuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href || '#'} // Ajoute un href fallback pour éviter warning
              onClick={item.onClick ? item.onClick : undefined}
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-4">{item.icon}</span>
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
