import React, { createContext, useState, useEffect } from "react";
import { use } from "react";

// Création du contexte
export const AppContext = createContext();

// Fournisseur du contexte
export const AppProvider = ({ children }) => {

    const [menuOpen, setMenuOpen] = useState(false);

  // DARK MODE
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        if (!isDarkMode) {
          document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);
    
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <AppContext.Provider value={{ menuOpen, setMenuOpen, isDarkMode, toggleTheme}}>
          {children}
        </AppContext.Provider>
      );
};