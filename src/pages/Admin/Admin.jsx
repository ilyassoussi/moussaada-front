
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '../../components/AdminCompo/toaster';
import LoginPage from '../../components/AdminCompo/LoginPage';
import Dashboard from '../../components/AdminCompo/Dashboard';
import { login } from  '../../services/auth';
import { logout } from  '../../services/apiAdmin';
import { useToast } from '../../components/PaysanCompo/use-toast';
import useVerifyTokenAdmin from '../../services/useVerifyTokenAdmin'

function Admin() {
    useVerifyTokenAdmin();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté
        const adminToken = localStorage.getItem('token-admin');
        if (adminToken) {
            console.log(adminToken)
            setIsAuthenticated(true);
        }else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const data = await login(credentials.email, credentials.password); // Appel de l'API
            const token = data?.Token;

            if (!token) throw new Error("Token manquant dans la réponse");

            // Stocker le token
            localStorage.setItem("token-admin", token);
            // Redirection
            setIsAuthenticated(true);
        } catch (err) {
            toast({
                title: "Échec de la connexion",
                description: err.message || "Identifiant ou mot de passe incorrect.",
                variant: 'destructive',
            });
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            localStorage.removeItem('token-admin');
            setIsAuthenticated(false);
        } catch (error) {
        console.error("Erreur logout:", error);
        }
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