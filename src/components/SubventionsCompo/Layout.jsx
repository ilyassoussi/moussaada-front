import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {Footer} from '../PaysanCompo/footer';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom'; // ⬅️ Import obligatoire
import useVerifyTokenSubvention from '../../services/useVerifyTokenSubvention'
const Layout = () => {
  useVerifyTokenSubvention();
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          <Outlet /> 
        </motion.main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
