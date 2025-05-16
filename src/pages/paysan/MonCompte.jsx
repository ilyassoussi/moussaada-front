
import React from "react";
import { Toaster } from "../../components/PaysanCompo/toaster";
import { Sidebar } from "../../components/PaysanCompo/sidebar";
import { Header } from "../../components/PaysanCompo/header";
import { WelcomeBanner } from "../../components/PaysanCompo/welcome-banner";
import { AccountSituation } from "../../components/PaysanCompo/account-situation";
import { Footer } from "../../components/PaysanCompo/footer";
import { motion } from "framer-motion";
import UseVerifyToken from '../../services/useVerifyToken';

function MonCompte() {
  UseVerifyToken();
  return (
    <div className="flex h-screen bg-background text-foreground antialiased">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-y-auto p-8 space-y-8"
        >
          <WelcomeBanner name="ES-SALLAMY ZAKARIA" />
          <AccountSituation />
        </motion.main>
        
        <Footer />
      </div>
      
      <Toaster />
    </div>
  );
}

export default MonCompte;
