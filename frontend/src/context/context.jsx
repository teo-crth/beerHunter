import React, { createContext, useState, useEffect } from "react";
import { use } from "react";

// Création du contexte
export const AppContext = createContext();

// Fournisseur du contexte
export const AppProvider = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [searchResultBars , setSearchResultBars] = useState([]);
  const [ isLogin, setIsLogin ] = useState(false);

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
      localStorage.setItem('token', JSON.stringify(user.token));
      localStorage.setItem('user', JSON.stringify(user));
      
        if (user.theme === 'dark') {
          setIsDarkMode(true);
        } else {
          setIsDarkMode(false);
        }
      }
    }, [user]);

    useEffect(() => {
      const localStorageToken = localStorage.getItem('token');
      console.log('localStorageToken', localStorageToken);
      
      if (localStorageToken) {
          JSON.parse(localStorageToken);
          setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    
      const localStorageUser = localStorage.getItem('user');
      console.log('localStorageUser', localStorageUser);
      
      if (localStorageUser) {
          const user = JSON.parse(localStorageUser);
          setUser(user);
      } else {
        setUser(null);
      }
    }, []); 
    
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Modals

    const [modalState, setModalState] = useState({
      isOpen: false,
      type: '',
      text: '',
    });
  
    const openModal = (type, text) => setModalState({ isOpen: true, type, text });
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
            modalState,
            searchResultBars,
            setSearchResultBars, 
            isLogin,
            setIsLogin
          }}>
          {children}
        </AppContext.Provider>
      );
};