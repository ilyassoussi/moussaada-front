import React from 'react';
    import { NavLink, useNavigate } from 'react-router-dom';
    import { Home, FileText, Tractor, ClipboardList, LogOut, DollarSign } from 'lucide-react';
    import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

    import moussaadaArmerie from '../../assets/ArmoiriesduMaroc.svg'
import { logout } from '../../services/apiSubvention';

    const navItems = [
      { name: 'Tableau de Bord', path: '/agent/dashboard-subvention', icon: Home },
      { name: 'Gention Subventions', path: '/agent/subvention', icon: FileText },
      { name: 'Gestion Demandes ', path: '/agent/demandes', icon: DollarSign },
      { name: 'Missions Terrain', path: '/agent/missions-terrain', icon: Tractor },
      { name: 'Rapports', path: '/agent/rapports', icon: ClipboardList },
    ];

    const Sidebar = () => {

      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          await logout();
          localStorage.removeItem('token-subventions');
          window.location.href = '/boSubventions55684';
        } catch (error) {
          console.error("Erreur logout:", error);
        }
      };

      return (
        <motion.aside 
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="w-64 bg-card text-card-foreground p-4 flex flex-col border-r border-border shadow-lg"
        >
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center mb-8 p-2">
              <img src={moussaadaArmerie} alt='icon moussaada' className="h-10 w-10 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-primary">MOUSSAADA</h1>
            </div>
          </Link>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-muted hover:text-accent-foreground
                  ${isActive ? 'bg-primary/10 text-primary font-semibold shadow-sm ring-1 ring-primary/20' : 'text-foreground/80 hover:text-foreground'}`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
            {/* Lien de déconnexion */}
            <a
              href="/boSubventions55684"
              onClick={handleLogout}
              className="flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out text-foreground/80 hover:text-foreground hover:bg-muted hover:text-accent-foreground"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </a>
          </nav>
          <div className="mt-auto p-2 text-center">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} MOUSSAADA</p>
          </div>
        </motion.aside>
      );
    };

    export default Sidebar;