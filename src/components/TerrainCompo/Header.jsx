import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, User, Search, Sun } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

const Header = ({ onMenuToggle, activeSection }) => {
  const getSectionTitle = (section) => {
    const titles = {
      demandes: 'Demandes de Subventions',
      rapports: 'Rapports de Visite',
      statistiques: 'Tableau de Bord',
      notifications: 'Notifications',
      parametres: 'Paramètres'
    };
    return titles[section] || 'Tableau de Bord';
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="hover:bg-green-50"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getSectionTitle(activeSection)}
            </h1>
            <p className="text-sm text-gray-500">
              Service Terrain Agricole - Région Nord
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-lg">
            <Sun className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">24°C</span>
            <span className="text-xs text-gray-500">Ensoleillé</span>
          </div>

          <Button variant="ghost" size="icon" className="relative hover:bg-green-50">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
          </Button>

          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Ahmed Benali</p>
              <p className="text-xs text-gray-500">Agent Terrain</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;