
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '../../components/AdminCompo/toaster';
import LoginPage from '../../components/AdminCompo/LoginPage';
import Dashboard from '../../components/AdminCompo/Dashboard';

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (credentials) => {
        // Simulation d'authentification (remplacer par vraie logique)
        if (credentials.email === 'admin@moussaada.dz' && credentials.password === 'admin123') {
            localStorage.setItem('adminToken', 'admin-authenticated');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center agricultural-pattern">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-semibold gradient-text">Chargement de MOUSSAADA...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen agricultural-pattern">
            <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                    <LoginPage key="login" onLogin={handleLogin} />
                ) : (
                    <Dashboard key="dashboard" onLogout={handleLogout} />
                )}
            </AnimatePresence>
            <Toaster />
        </div>
    );
}

export default Admin;