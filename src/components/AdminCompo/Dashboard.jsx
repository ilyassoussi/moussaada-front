
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import NewsManagement from './NewsManagement';
import UserManagement from './UserManagement';
import ComplaintsManagement from './ComplaintsManagement';
import TrainingManagement from './TrainingManagement';
import DashboardOverview from './DashboardOverview';
import useVerifyTokenAdmin from '../../services/useVerifyTokenAdmin'

const Dashboard = ({ onLogout }) => {
  useVerifyTokenAdmin();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'news':
        return <NewsManagement />;
      case 'users':
        return <UserManagement />;
      case 'complaints':
        return <ComplaintsManagement />;
      case 'training':
        return <TrainingManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header onLogout={onLogout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
