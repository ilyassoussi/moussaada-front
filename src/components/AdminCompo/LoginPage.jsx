
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { toast } from './use-toast';
import { Sprout, Shield, Users, FileText } from 'lucide-react';
import logo from '../../assets/ArmoiriesduMaroc.svg'

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'un délai de connexion
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = onLogin(credentials);
    
    if (success) {
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue dans le dashboard MOUSSAADA",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const features = [
    {
      icon: FileText,
      title: "Gestion des Actualités",
      description: "Créez et gérez les actualités agricoles"
    },
    {
      icon: Users,
      title: "Gestion des Utilisateurs",
      description: "Administrez agents et paysans"
    },
    {
      icon: Shield,
      title: "Traitement des Réclamations",
      description: "Suivez et répondez aux réclamations"
    },
    {
      icon: Sprout,
      title: "Formations Agricoles",
      description: "Organisez les sessions de formation"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Section gauche - Informations */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <div className="w-12 h-12  from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <img src={logo} className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold gradient-text">MOUSSAADA</h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8"
            >
              Plateforme d'administration pour la Direction de la Programmation Agricole
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-effect rounded-xl p-4 card-hover"
              >
                <feature.icon className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section droite - Formulaire de connexion */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <Card className="w-full max-w-md glass-effect border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Connexion Administrateur
              </CardTitle>
              <CardDescription className="text-gray-600">
                Accédez au dashboard de gestion
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@moussaada.ma"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12 border-2 focus:border-green-500 transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="h-12 border-2 focus:border-green-500 transition-colors"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Connexion...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </form>
{/* 
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium mb-2">Compte de démonstration :</p>
                <p className="text-xs text-blue-600">Email: admin@moussaada.dz</p>
                <p className="text-xs text-blue-600">Mot de passe: admin123</p>
              </div> */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
