
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "../../../components/ui/toaster";
import AuthForm from "./AuthForm";
import Footer from "../../../components/Footer/Footer";
import NavBar from '../../../components/Header/Navbar';
import UseVerifyToken from '../../../services/useVerifyToken';

const LoginPage = () => {
  UseVerifyToken();

  return (
    <div className="min-h-screen flex flex-col ">
      <NavBar />
      <main className="flex-grow leaf-pattern py-[100px]">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 text-green-900"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Développez votre ferme avec <span className="text-lime-600">Moussaada</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-700 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Rejoignez des milliers d’agriculteurs qui révolutionnent l’agriculture grâce à des technologies intelligentes et des pratiques durables.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md flex items-center space-x-3 grow-on-hover">
                  <div className="bg-green-100 p-2 rounded-full">
                    <img  alt="Soil analysis icon" className="w-8 h-8" src="https://images.unsplash.com/photo-1596571428702-72f56826e105" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Soil Analysis</h3>
                    <p className="text-xs text-gray-600">Advanced testing</p>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md flex items-center space-x-3 grow-on-hover">
                  <div className="bg-green-100 p-2 rounded-full">
                    <img  alt="Crop management icon" className="w-8 h-8" src="https://images.unsplash.com/photo-1667154290181-135ee2dd5c0e" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Crop Management</h3>
                    <p className="text-xs text-gray-600">Optimize yields</p>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md flex items-center space-x-3 grow-on-hover">
                  <div className="bg-green-100 p-2 rounded-full">
                    <img  alt="Weather forecast icon" className="w-8 h-8" src="https://images.unsplash.com/photo-1677207858927-253a20fa397d" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Weather Insights</h3>
                    <p className="text-xs text-gray-600">Precision forecasts</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="hidden lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-md inline-block">
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-4">
                      <img  alt="Farmer profile" className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1670607951160-d7780f0f0478" />
                      <img  alt="Farmer profile" className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1670607951160-d7780f0f0478" />
                      <img  alt="Farmer profile" className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1595702828370-21de98ebb655" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Trusted by 10,000+ farmers</p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">4.9/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right side - Auth form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 w-full max-w-md"
            >
              <AuthForm />
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-20 left-10 hidden lg:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full floating" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-40 right-10 hidden lg:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="w-24 h-24 bg-lime-500 bg-opacity-20 rounded-full floating" style={{ animationDelay: "1s" }} />
        </motion.div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default LoginPage;
