
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  GraduationCap,
  Sprout,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import logo from '../../assets/ArmoiriesduMaroc.svg'
const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'news', label: 'Actualités', icon: FileText },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'complaints', label: 'Réclamations', icon: MessageSquare },
    { id: 'training', label: 'Formations', icon: GraduationCap },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isOpen && (
            <a href="/">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <img src={logo} className="w-15 h-15 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">MOUSSAADA</h2>
                  <p className="text-xs text-gray-500">Admin Dashboard</p>
                </div>
              </div>
            </a>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <span className="font-medium truncate">{item.label}</span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <p className="text-xs text-gray-600 text-center">
              Direction de la Programmation Agricole
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
