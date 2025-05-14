
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/Button/button";
import { Checkbox } from "../../components/ui/checkbox";
import { useToast } from "../../components/ui/use-toast";
import { User, Lock, Mail, Eye, EyeOff, IndentIcon } from "lucide-react";
import { login } from "../../services/auth"; // ajoute ce import
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/ArmoiriesduMaroc.svg'

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identite: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    datedenaissance: "",
    agreeTerms: false,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.identite || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await login(formData.identite, formData.password);
      
      const token = result.Token;
      console.log(token)
      localStorage.setItem("token", token);
      if(token!=null){
          navigate('/espace-paysan');
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur AgriConnect !",
          });
      }
      

    // Redirection possible ici...
  } catch (err) {
      toast({
        title: "Échec de connexion",
        description: err.message || "Identifiants incorrects",
        variant: "destructive",
      });
  }

  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.datedenaissance || !formData.identite || !formData.phone || !formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would register with a backend service
    // For now, we'll just show a success message
    toast({
      title: "Success",
      description: "Your account has been created successfully!",
    });
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <motion.div 
          className="flex items-center space-x-2 bg-white bg-opacity-90 px-4 py-2 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src={icon} className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-lime-500 bg-clip-text text-transparent">
            Moussaada
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden auth-container form-shine"
      >
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-green-50 rounded-t-xl p-1">
            <TabsTrigger 
              value="login"
              className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-lg"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-lg"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            <AnimatePresence mode="wait">
              <TabsContent value="login" className="mt-0">
                <motion.form
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 flex items-center gap-1">
                      <IndentIcon className="h-4 w-4 text-green-600" /> 
                        Identité
                    </Label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Input
                        id="identite"
                        name="identite"
                        type="text"
                        placeholder="XXXXXX"
                        value={formData.identite}
                        onChange={handleChange}
                        className="border-green-200 focus:border-green-500"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 flex items-center gap-1">
                      <Lock className="h-4 w-4 text-green-600" />
                      Password
                    </Label>
                    <motion.div 
                      whileHover={{ scale: 1.01 }} 
                      whileTap={{ scale: 0.99 }}
                      className="relative"
                    >
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-green-200 focus:border-green-500 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </motion.div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-green-600 hover:text-green-800"
                    >
                      Forgot password?
                    </a>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                    >
                      Sign In
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0">
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 flex items-center gap-1">
                      <User className="h-4 w-4 text-green-600" />
                      Full Name
                    </Label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-green-200 focus:border-green-500"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700 flex items-center gap-1">
                      <Mail className="h-4 w-4 text-green-600" />
                      Email
                    </Label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-green-200 focus:border-green-500"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700 flex items-center gap-1">
                      <Lock className="h-4 w-4 text-green-600" />
                      Password
                    </Label>
                    <motion.div 
                      whileHover={{ scale: 1.01 }} 
                      whileTap={{ scale: 0.99 }}
                      className="relative"
                    >
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-green-200 focus:border-green-500 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-700 flex items-center gap-1">
                      <Lock className="h-4 w-4 text-green-600" />
                      Confirm Password
                    </Label>
                    <motion.div 
                      whileHover={{ scale: 1.01 }} 
                      whileTap={{ scale: 0.99 }}
                      className="relative"
                    >
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="border-green-200 focus:border-green-500 pr-10"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, agreeTerms: checked }))
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-green-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-green-600 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 text-white"
                    >
                      Create Account
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 text-center text-sm text-gray-600"
      >
        By using our platform, you're helping to grow sustainable agriculture.
      </motion.div>
    </div>
  );
};

export default AuthForm;
