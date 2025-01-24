import React, { createContext, useState, useEffect } from "react";
import { use } from "react";

// Création du contexte
export const AppContext = createContext();

// Fournisseur du contexte
export const AppProvider = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // MANAGE MODALS
  const toggleModal = () => {
    setIsModalOpen(prevMode => !prevMode);
  };

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
        <AppContext.Provider value={{ menuOpen, setMenuOpen, isDarkMode, toggleTheme, user, setUser, isModalOpen, setIsModalOpen, toggleModal }}>
          {children}
        </AppContext.Provider>
      );
};