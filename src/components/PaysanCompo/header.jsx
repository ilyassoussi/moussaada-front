
import React from "react";
import { Search, Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { Input } from "./input";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";


export function Header() {
  const [darkMode, setDarkMode] = React.useState(true);

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg" /* Glassmorphism effect */
    >
      <div className="flex h-20 items-center px-8 justify-between"> {/* Increased height and padding */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Recherchez ici..."
            className="pl-10 h-11 bg-background/70 border-border focus:border-primary transition-colors" /* Adjusted styling */
          />
        </div>
        
        <div className="flex items-center gap-6"> {/* Increased gap */}
           <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-muted-foreground hover:text-foreground">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell size={22} />
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            </Button>
          </motion.div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div 
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ opacity: 0.8 }}
              >
                <Avatar className="h-10 w-10 border-2 border-primary"> {/* Avatar highlight */}
                  <AvatarImage src="https://i.pravatar.cc/150?u=essalamy" alt="ES-SALLAMY ZAKARIA" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">ES</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-foreground">ES-SALLAMY ZAKARIA</span>
                  <span className="text-xs text-muted-foreground">969654608</span>
                </div>
                <ChevronDown size={18} className="text-muted-foreground" />
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border shadow-xl">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border"/>
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border"/>
              <DropdownMenuItem className="text-destructive focus:bg-destructive/30 focus:text-destructive-foreground">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </motion.header>
  );
}