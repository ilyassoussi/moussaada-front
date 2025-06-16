import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/PaysanCompo/button';
import { Input } from '../../components/PaysanCompo/input';
import { Label } from '../../components/PaysanCompo/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/PaysanCompo/card';
import { useToast } from '../../components/PaysanCompo/use-toast';
import { LogIn, User, Lock, Moon, Sun, ArrowRight } from 'lucide-react';
import moroccanArmerie from '../../assets/ArmoiriesduMaroc.svg';
import { login } from '../../services/auth';
import UseVerifyTokenSubvention from '../../services/useVerifyTokenSubvention'

const AgentLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  UseVerifyTokenSubvention();
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(darkMode ? 'dark' : 'light');
    root.classList.remove(darkMode ? 'light' : 'dark');
    document.documentElement.lang = 'fr';
    document.documentElement.dir = 'ltr';
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(agentId, password); // Appel de l'API
      const token = data?.Token;

      if (!token) throw new Error("Token manquant dans la réponse");

      // Stocker le token
      localStorage.setItem("token-subventions", token);
      // Redirection
      navigate('/agent/dashboard-subvention');
    } catch (err) {
      toast({
        title: "Échec de la connexion",
        description: err.message || "Identifiant ou mot de passe incorrect.",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/80 via-primary to-secondary/70 flex flex-col items-center justify-center p-4">
      <motion.div className="absolute top-4 right-4 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-primary-foreground hover:bg-primary-foreground/10">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-lg">
          <CardHeader className="text-center">
            <div className="mx-auto text-primary-foreground rounded-full p-3 w-fit mb-4">
              <img src={moroccanArmerie} className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">Connexion Agent Subventions</CardTitle>
            <CardDescription>Veuillez vous connecter pour accéder à l'espace de gestion.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="agentId" className="flex items-center gap-2 text-muted-foreground">
                  <User size={16} /> Identifiant Agent
                </Label>
                <Input
                  id="agentId"
                  type="text"
                  placeholder="Entrez votre identifiant"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  required
                  className="h-11 bg-background/70 border-border focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-muted-foreground">
                  <Lock size={16} /> Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-background/70 border-border focus:border-primary transition-colors"
                />
              </div>
              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground">
                <LogIn size={18} className="mr-2" />
                Se connecter
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-primary">
                <Link to="/">
                  Accéder à l'Espace Utilisateur <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AgentLoginPage;
