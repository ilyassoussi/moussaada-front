
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf,Globe, Menu, X, Home, Info, ShoppingCart, Tractor, Phone, LogIn, Paperclip, NewspaperIcon } from "lucide-react";
import { Button } from "../Button/button";
import { Link } from "react-router-dom";
import iconArmerieMaroc from '../../assets/ArmoiriesduMaroc.svg'
import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../PublicPage/ui/dropdown-menu';
const Navbar = ({ linkColor = "text-gray-700", linkHoverColor = "hover:text-green-700" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLocal, setIsOpenLocal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  
  const navItems = [
    { name: "news", icon: NewspaperIcon, href: "/nos-actualites" },
    { name: "Services", icon: Tractor, href: "/nos-services" },
    { name: "about", icon: Info, href: "/qui-somme-nous" }, // Example for in-page link
    { name: "Contact", icon: Phone, href: "/contact" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpenLocal(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoVariants = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 10 } },
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const mobileMenuVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
      opacity: 0, 
      y: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
  };
  
  const NavLink = ({ href, children, className, icon: Icon, itemAnimateProps }) => {
  const commonClasses = `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 group transition-colors duration-200 
      ${isScrolled || isOpen ? "text-black" : `${linkColor} ${linkHoverColor}`}
      ${isScrolled || isOpen ? "hover:bg-green-100" : "hover:bg-white/20"}
      ${className}`;

    if (href.startsWith('/')) { // Basic check for in-page links
      return (
        <motion.a
          href={href.substring(1)} // Use direct anchor href
          className={commonClasses}
          {...itemAnimateProps}
          onClick={() => isOpen && setIsOpen(false)} // Close mobile menu on click
        >
          {Icon && <Icon className={`h-4 w-4 ${isScrolled || isOpen ? 'text-green-600' : 'text-green-600'} group-hover:text-green-700 transition-colors duration-200`} />}
          <span>{children}</span>
        </motion.a>
      );
    }

    return (
      <motion.custom
        component={Link}
        to={href}
        className={commonClasses}
        {...itemAnimateProps}
        onClick={() => isOpen && setIsOpen(false)} // Close mobile menu on click
      >
        {Icon && <Icon className={`h-4 w-4 ${isScrolled || isOpen ? 'text-green-600' : 'text-green-600'} group-hover:text-green-700 transition-colors duration-200`} />}
        <span>{children}</span>
      </motion.custom>
    );
  };


  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isOpen ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <Link to="/" className="flex items-center space-x-2">
              <img src={iconArmerieMaroc} className={`h-8 w-8 ${isScrolled || isOpen ? 'text-green-700' : 'text-green-700'}`} />
              <span 
                className={`text-2xl font-bold bg-gradient-to-r from-green-700 to-lime-500 bg-clip-text ${
                  isScrolled || isOpen ? 'text-transparent' : 'text-transparent'
                }`}
              >
                {t('appName.appname')}
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
               <NavLink 
                key={item.name} 
                href={item.href} 
                icon={item.icon}
                itemAnimateProps={{
                    variants: navItemVariants,
                    initial:"initial",
                    animate:"animate",
                    transition:{ delay: 0.1 * index + 0.2 }
                }}
              >
              {t(`nav.${item.name}`)}
              </NavLink>
            ))}
          </div>
          
          <motion.div 
            className="hidden md:block"
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 * navItems.length + 0.2 }}
          >
            <Link to="/login">
              <Button variant="outline" className={`grow-on-hover ${isScrolled || isOpen ? "border-green-600 text-green-600 hover:bg-green-600 hover:text-white" : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"}`}>
                <LogIn className="mr-2 h-4 w-4" /> {t('connect.seconnecter')}
              </Button>
            </Link>
          </motion.div>

          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className={`p-2 rounded-md focus:outline-none transition-transform duration-300 ease-in-out ${isScrolled || isOpen ? "text-gray-700 hover:bg-green-100" : "text-white hover:bg-white/20"}`}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: isOpen ? -90 : 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: isOpen ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-green-50 hover:text-green-600">
                  <Globe className={`h-5 w-5 ${linkColor || 'text-gray-500'}`} />
                  <span className="sr-only">Changer de langue</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white shadow-xl rounded-lg border-gray-100">
                <DropdownMenuItem onClick={() => changeLanguage('fr')} className={`cursor-pointer hover:bg-green-50 ${i18n.language === 'fr' ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                  {t('languages.fr')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ar')} className={`cursor-pointer hover:bg-green-50 ${i18n.language === 'ar' ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                  {t('languages.ar')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white shadow-xl absolute w-full"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <NavLink 
                  key={item.name} 
                  href={item.href} 
                  icon={item.icon}
                  className="block !text-gray-700 !hover:bg-green-100 !hover:text-green-700 w-full text-left"
                  itemAnimateProps={{
                    initial:{ opacity: 0, x: -20 },
                    animate:{ opacity: 1, x: 0 },
                    transition:{ delay: 0.1 * index }
                  }}
                >
                  {item.name}
                </NavLink>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navItems.length }}
                className="pt-2"
              >
                <Link to="/login" className="w-full block" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                    <LogIn className="mr-2 h-4 w-4" /> Se Connecter
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
