import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  ClipboardList,
  LogOut,
  X,
  Sprout,
  BarChart3,
  Bell
} from 'lucide-react';
import { Button } from './button';
import logo from '../../assets/ArmoiriesduMaroc.svg'
import { Link } from "react-router-dom";
import { logout } from "../../services/apiTerrain"
const Sidebar = ({ activeSection, onSectionChange, isOpen, onToggle }) => {
  const menuItems = [
    {
      id: 'statistiques',
      label: 'Tableau de Bord',
      icon: BarChart3,
      description: 'Vue d\'ensemble et analyses'
    },
    {
      id: 'demandes',
      label: 'Demandes',
      icon: FileText,
      description: 'Consulter les subventions'
    },
    {
      id: 'rapports',
      label: 'Rapports',
      icon: ClipboardList,
      description: 'Gérer les visites terrain'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Validations et refus'
    },
    {
      id: 'Deconnexion',
      label: 'Deconnexion',
      icon: LogOut,
      description: 'Deconnexion du compte'
    }
  ];
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.removeItem("token-terrain");
      window.location.href = "/boTerrain1266654";
    } catch (error) {
      console.error("Erreur logout:", error);
    }
  };
  const sidebarVariants = {
    open: {
      x: 0,
      width: '20rem', // 320px
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closedMobile: {
      x: '-100%',
      width: '20rem',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closedDesktop: {
      x: 0,
      width: '5rem', // 80px for collapsed state on desktop
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsDesktopCollapsed(false); // Ensure mobile is not in collapsed desktop state
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const getSidebarState = () => {
    if (window.innerWidth >= 1024) {
      return isOpen ? 'open' : 'closedDesktop';
    }
    return isOpen ? 'open' : 'closedMobile';
  };


  const itemVariants = (isSidebarOpen) => ({
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: 0.1
      }
    },
    closed: {
      opacity: isSidebarOpen ? 1 : 0, // Keep icon visible when desktop collapsed
      x: isSidebarOpen ? 0 : -10,
      transition: { duration: 0.1 }
    }
  });

  const textVariants = {
    open: { opacity: 1, display: 'block', transition: { delay: 0.2 } },
    closed: { opacity: 0, display: 'none', transition: { duration: 0.1 } }
  };


  return (
    <>
      <AnimatePresence>
        {isOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <motion.aside
        variants={sidebarVariants}
        animate={getSidebarState()}
        className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-50 lg:relative lg:translate-x-0 lg:shadow-lg flex flex-col
          ${getSidebarState() === 'closedDesktop' ? 'items-center' : ''}
        `}
      >
        <div className="flex flex-col h-full w-full">
          <div className={`p-6 border-b border-green-100 agricultural-gradient flex items-center 
            ${getSidebarState() === 'closedDesktop' ? 'justify-center h-[73px]' : 'justify-between'}
          `}>
            <motion.div
              animate={getSidebarState() === 'open' || window.innerWidth < 1024 ? 'open' : 'closed'}
              variants={textVariants}
              className="flex items-center space-x-3"
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex items-center  p-2">
                  <img
                    src={logo}
                    alt="icon moussaada"
                    className="h-10 w-10 text-primary mr-3"
                  />
                  <h1 className="text-2xl font-bold text-white/40">MOUSSAADA</h1>
                </div>
              </Link>
            </motion.div>

            {(getSidebarState() !== 'open' && window.innerWidth >= 1024) && (
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <img
                  src={logo}
                  alt="icon moussaada"
                  className="w-6 h-6 "
                />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className={`text-white hover:bg-white/20 
                ${getSidebarState() === 'closedDesktop' && window.innerWidth >= 1024 ? 'lg:block' : 'lg:hidden'}
                ${getSidebarState() === 'open' && window.innerWidth < 1024 ? 'block' : 'hidden'}
                ${getSidebarState() === 'open' && window.innerWidth >= 1024 ? 'lg:block' : ''}
              `}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className={`flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide mt-10
            ${getSidebarState() === 'closedDesktop' ? 'flex flex-col items-center' : ''}
          `}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants(getSidebarState() === 'open' || window.innerWidth < 1024)}
                  initial="closed"
                  animate="open"
                >
                  <button
                    onClick={(e) => {
                      if (item.id === 'Deconnexion') {
                        handleLogout(e);
                      } else {
                        onSectionChange(item.id);
                        if (window.innerWidth < 1024 && isOpen) onToggle();
                      }
                    }}
                    title={item.label}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 hover-lift group flex items-center space-x-4
                        ${isActive ? 'agricultural-gradient text-white shadow-lg' : 'hover:bg-green-50 text-gray-700'}
                        ${getSidebarState() === 'closedDesktop' ? 'justify-center' : ''}
                      `}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors 
                        ${isActive ? 'bg-white/20' : 'bg-green-100 group-hover:bg-green-200'}
                      `}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-green-600'}`} />
                    </div>
                    <motion.div
                      className={`flex-1 ${getSidebarState() === 'closedDesktop' ? 'hidden' : 'block'}`}
                      variants={textVariants}
                      animate={getSidebarState() === 'open' || window.innerWidth < 1024 ? 'open' : 'closed'}
                    >
                      <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                        {item.label}
                      </h3>
                      <p className={`text-sm ${isActive ? 'text-green-100' : 'text-gray-500'}`}>
                        {item.description}
                      </p>
                    </motion.div>
                  </button>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            className={`p-4 border-t border-gray-200 ${getSidebarState() === 'closedDesktop' ? 'hidden' : 'block'}`}
            variants={textVariants}
            animate={getSidebarState() === 'open' || window.innerWidth < 1024 ? 'open' : 'closed'}
          >
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Version 2.1.0</p>
                  <p className="text-xs text-gray-500">Dernière MàJ</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;