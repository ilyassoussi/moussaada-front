import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff, User, Lock, Loader2 } from 'lucide-react';
import { login } from '../../../services/auth';
import { useToast } from '../../../components/PaysanCompo/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import UseVerifyTokenTerrain from '../../../services/useVerifyTokenTerrain'

export default function LoginForm({ onLogin }) {
  UseVerifyTokenTerrain();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    if (field === 'identity') {
      if (!value.trim()) {
        newErrors.identity = "L'identifiant est requis";
      } else if (value.length < 3) {
        newErrors.identity = "L'identifiant doit contenir au moins 3 caractères";
      } else {
        delete newErrors.identity;
      }
    }

    if (field === 'password') {
      if (!value) {
        newErrors.password = 'Le mot de passe est requis';
      } else if (value.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(identity, password); // Appel de l'API
      const token = data?.Token;

      if (!token) throw new Error("Token manquant dans la réponse");

      // Stocker le token
      localStorage.setItem("token-terrain", token);
      // Redirection
      navigate('/agent/espace-technicien');
    } catch (err) {
      toast({
        title: "Échec de la connexion",
        description: err.message || "Identifiant ou mot de passe incorrect.",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identity Field */}
        <div className="group">
          <label
            htmlFor="identity"
            className="block text-sm font-semibold text-green-800 mb-2 transition-colors duration-200 group-focus-within:text-green-600"
          >
            Identifiant
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-green" />
            </div>
            <input
              id="identity"
              type="text"
              value={identity}
              onChange={(e) => {
                setIdentity(e.target.value);
                validateField('identity', e.target.value);
              }}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/80 backdrop-blur-sm 
                transition-all duration-300 focus:outline-none focus:ring-0
                placeholder:text-green-400/60 text-green-900 font-medium
                ${errors.identity
                  ? 'border-red-300 focus:border-red-500 shadow-red-100'
                  : 'border-green-200 focus:border-green-500 hover:border-green-300 focus:shadow-green-100'
                } focus:shadow-lg transform focus:scale-[1.02]`}
              placeholder="Votre nom d'utilisateur"
              autoComplete="username"
            />
          </div>
          {errors.identity && (
            <p className="mt-2 text-sm text-red-600 animate-fadeIn">{errors.identity}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="group">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-green-800 mb-2 transition-colors duration-200 group-focus-within:text-green-600"
          >
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-green" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField('password', e.target.value);
              }}
              className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl bg-white/80 backdrop-blur-sm 
                transition-all duration-300 focus:outline-none focus:ring-0
                placeholder:text-green-400/60 text-green-900 font-medium
                ${errors.password
                  ? 'border-red-300 focus:border-red-500 shadow-red-100'
                  : 'border-green-200 focus:border-green-500 hover:border-green-300 focus:shadow-green-100'
                } focus:shadow-lg transform focus:scale-[1.02]`}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500 hover:text-green-600 
                transition-colors duration-200 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 animate-fadeIn">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || Object.keys(errors).length > 0}
          className="w-full py-3 px-6 text-white font-semibold text-lg rounded-xl
            bg-gradient-to-r from-green-600 to-green-700 
            hover:from-green-700 hover:to-green-800
            disabled:from-green-400 disabled:to-green-500
            disabled:cursor-not-allowed
            transition-all duration-300 ease-out
            transform hover:scale-[1.02] active:scale-[0.98]
            focus:outline-none focus:ring-4 focus:ring-green-200
            shadow-lg hover:shadow-2xl
            relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 
            transform scale-x-0 group-hover:scale-x-100 transition-transform 
            duration-300 origin-left"></span>
          <span className="relative flex items-center justify-center">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Connexion en cours...
              </>
            ) : (
              'Se connecter au BackOffice'
            )}
          </span>
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
