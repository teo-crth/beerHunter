import React, { createContext, useState, useEffect } from "react";
import { use } from "react";

// Création du contexte
export const AppContext = createContext();

// Fournisseur du contexte
export const AppProvider = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

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

    useEffect(() => {
      if (user) {
        if (user.theme === 'dark') {
          setIsDarkMode(true);
        } else {
          setIsDarkMode(false);
        }
      }
    }, [user]);
    
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Modals

    const [modalState, setModalState] = useState({
      isOpen: false,
      type: '',
      text: '',
    });
  
    const openModal = (type) => setModalState({ isOpen: true, type });
    const closeModal = () => setModalState({ isOpen: false, type: '' });




    return (
        <AppContext.Provider 
          value={{ 
            menuOpen, 
            setMenuOpen,
            isDarkMode,
            toggleTheme,
            user,
            setUser,
            isModalEditOpen, 
            setIsModalEditOpen,
            openModal, 
            closeModal,
            modalState
          }}>
          {children}
        </AppContext.Provider>
      );
};