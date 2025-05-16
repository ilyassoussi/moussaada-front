
import React from "react";
import { cn } from "./utils";
import { motion } from "framer-motion";
import iconArmerie from '../../assets/ArmoiriesduMaroc.svg'
import { 
  LayoutGrid, 
  Edit3, 
  Calendar, 
  FileText, 
  MessageCircle, 
  List,
  Settings,
  LogOut
} from "lucide-react";

const menuItems = [
  { icon: <LayoutGrid size={20} />, label: "Mon compte", active: true, href: "#"},
  { icon: <Edit3 size={20} />, label: "Mise à jour situation", active: false, href: "#"},
  { icon: <Calendar size={20} />, label: "Prise de rendez-vous", active: false, href: "#"},
  { icon: <FileText size={20} />, label: "Attestations en ligne", active: false, href: "#"},
  { icon: <MessageCircle size={20} />, label: "Réclamations", active: false, href: "#"},
  { icon: <List size={20} />, label: "Suivi des réclamations", active: false, href: "#"}
];

const bottomMenuItems = [
  { icon: <Settings size={20} />, label: "Paramètres", href: "#" },
  { icon: <LogOut size={20} />, label: "Déconnexion", href: "#" },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Mon compte");

  return (
    <motion.div 
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-full w-72 bg-card text-card-foreground flex flex-col justify-between shadow-2xl" /* Increased width and shadow */
    >
      <div>
        <div className="p-6 flex items-center space-x-3">
          <img 
            src={iconArmerie} 
            alt="CNRA RCAR Logo" 
            className="h-10" /* Slightly smaller logo */
          />
          <span className="font-semibold text-xl">Moussaada</span>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
                activeItem === item.label
                  ? "bg-primary text-primary-foreground shadow-md scale-105" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              whileHover={{ scale: activeItem !== item.label ? 1.05 : 1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-4">{item.icon}</span>
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <nav className="space-y-2">
          {bottomMenuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-4">{item.icon}</span>
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
