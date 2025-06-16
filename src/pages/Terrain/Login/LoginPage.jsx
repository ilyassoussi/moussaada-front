import React from "react";
import { Wheat, Sprout, TreePine } from "lucide-react";
import LoginForm from "./LoginForm";
import '../../../styles/terrainLogin.css';
import { Link } from "react-router-dom";
import logo from '../../../assets/ArmoiriesduMaroc.svg'
import { LogIn, User, Lock, Moon, Sun, ArrowRight } from 'lucide-react';
export default function LoginPage() {
  const handleLogin = (identity, password) => {
    console.log("Tentative de connexion:", { identity, password });
    alert(`Connexion réussie pour ${identity}`);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 transform rotate-12">
          <Wheat className="h-32 w-32 text-green-600" />
        </div>
        <div className="absolute top-32 right-16 transform -rotate-45">
          <Sprout className="h-24 w-24 text-green-500" />
        </div>
        <div className="absolute bottom-20 left-20 transform rotate-45">
          <TreePine className="h-28 w-28 text-green-700" />
        </div>
        <div className="absolute bottom-40 right-12 transform -rotate-12">
          <Wheat className="h-20 w-20 text-green-400" />
        </div>
      </div>

      {/* Floating Elements for Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Login Container */}
      <div className="w-full max-w-md transform animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeInDown">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className="w-20 h-20 from-green-600 to-green-700 
                            rounded-2xl flex items-center justify-center shadow-xl 
                            transform rotate-3 hover:rotate-6 transition-transform duration-300"
              >
                <Link to="/" className="flex items-center space-x-2">
                  <img src={logo} alt="logo maroc" className="h-10 w-10 text-white animate-pulse" />
                </Link>
              </div>
              <div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-500 
                            rounded-full flex items-center justify-center shadow-lg animate-bounce"
              >
                <Sprout className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-green-800 mb-2 
                        bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent"
          >
            MOUSSAADA
          </h1>
          <p className="text-green-600 font-medium text-lg">Accès BackOffice</p>
          <p className="text-green-500 text-sm mt-1">
            Gérez votre exploitation agricole en toute simplicité
          </p>
        </div>

        <div
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform hover:scale-[1.01] transition-all duration-500 animate-slideInUp"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-green-800 text-center mb-2">
              Connexion
            </h2>
            <p className="text-green-600 text-center text-sm">
              Connectez-vous pour accéder à votre espace de gestion
            </p>
          </div>

          <LoginForm onLogin={handleLogin} />

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <button variant="link" asChild
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-200 hover:underline"
            >
                <Link to="/">
                  Accéder à l'Espace Utilisateur <ArrowRight size={14} className="ml-1" />
                </Link>
            </button>
            <div className="text-green-500 text-xs">
              Besoin d'aide ? Contactez votre administrateur
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <p className="text-green-600 text-sm">
            © 2025 MOUSSAADA - Solution gouvernementaux de gestion agricole
          </p>
        </div>
      </div>
    </div>
  );
}
