
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
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';






export function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Mon compte");
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();
  
  const bottomMenuItems = [
  { icon: <Settings size={20} />, label: t('sidebar.settings'), href: "#" },
    { 
      icon: <LogOut size={20} />, 
      label: t('sidebar.logout'), 
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

  const menuItems = [
    { icon: <LayoutGrid size={20} />, label: t('sidebar.myAccount'), href: "/espace-paysan"},
    { icon: <Edit3 size={20} />, label: t('sidebar.updateSituation'), href: "/mise-a-jour-situation"},
    { icon: <Calendar size={20} />, label: t('sidebar.appointments'), href: "/prise-de-rendez-vous"},
    { icon: <Award size={20} />, label: t('sidebar.grantApplications'), href: "/demande-subventions"},
    { icon: <FilePlus size={20} />, label: t('sidebar.grantTracking'), href: "/suivi-subventions"},
    { icon: <MessageCircle size={20} />, label: t('sidebar.complaints'), href: "/reclamations"},
    { icon: <ListChecks size={20} />, label: t('sidebar.complaintTracking'), href: "/suivi-reclamations"}
  ];
  
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
            alt="Moussaada Logo" 
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
                currentPath === item.href
                  ? "bg-green-600 text-white shadow-md scale-105"
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
