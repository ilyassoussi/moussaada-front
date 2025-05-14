
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import iconArmerieMaroc from '../../assets/ArmoiriesduMaroc.svg'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <img src={iconArmerieMaroc} className="h-6 w-6 text-lime-400" />
              <h3 className="text-xl font-bold">Moussaada</h3>
            </div>
            <p className="text-green-100 text-sm">
              Empowering farmers with innovative solutions for sustainable agriculture and improved productivity.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a 
                whileHover={{ y: -3, color: "#4ade80" }}
                href="#" 
                className="text-green-200 hover:text-white"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: "#4ade80" }}
                href="#" 
                className="text-green-200 hover:text-white"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: "#4ade80" }}
                href="#" 
                className="text-green-200 hover:text-white"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: "#4ade80" }}
                href="#" 
                className="text-green-200 hover:text-white"
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold border-b border-green-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Products", "Blog", "Contact"].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a href="#" className="text-green-200 hover:text-lime-300 text-sm flex items-center">
                    <span className="mr-1">›</span> {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold border-b border-green-700 pb-2">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Crop Management", 
                "Soil Analysis", 
                "Irrigation Solutions", 
                "Organic Farming", 
                "Pest Control", 
                "Harvest Planning"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a href="#" className="text-green-200 hover:text-lime-300 text-sm flex items-center">
                    <span className="mr-1">›</span> {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold border-b border-green-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-lime-400 mt-0.5" />
                <span className="text-green-100 text-sm">123 Farm Road, Agriculture Valley, Country</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-lime-400" />
                <span className="text-green-100 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-lime-400" />
                <span className="text-green-100 text-sm">info@agriconnect.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-green-200 mb-4 md:mb-0">
            © {currentYear} Moussaada. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-green-300">
            <a href="#" className="hover:text-lime-300">Privacy Policy</a>
            <span className="text-green-700">|</span>
            <a href="#" className="hover:text-lime-300">Terms of Service</a>
            <span className="text-green-700">|</span>
            <a href="#" className="hover:text-lime-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
