import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon } from '@fortawesome/free-solid-svg-icons';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import { AppContext } from '../../context/context';
import logo from '../../assets/logo/beerHunter-letter-white.webp';
import logoLight from '../../assets/logo/beerHunter-letter-black.webp';
import { link } from 'fontawesome';

const Header = () => {
    // Etat pour gérer l'ouverture du menu burger
    const { 
        menuOpen, 
        setMenuOpen, 
        isDarkMode, 
        toggleTheme, 
        isLogin, 
        openModal,
        user
    } = useContext(AppContext);

    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // Fonction pour alterner l'état du menu burger
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="flex justify-between items-center w-full px-5 bg-dark-black light-mode:bg-light shadow-md z-45 relative">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}><img src={isDarkMode ? logo : logoLight} alt="Logo table avec des livres" className='w-50' /></NavLink>
            <div className="container-nav flex justify-around items-center gap-10">
                <nav className="nav-desktop hidden lg:flex xl:flex text-xl gap-10 items-center text-primary fontFamily-title">
                    <NavLink to="/" aria-label="Navigation vers la page d'accueil" className={({ isActive }) => isActive ? 'active font-title' : 'font-title'}>Accueil</NavLink>
                    <NavLink to="/contact" aria-label="Navigation vers la page de contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                    {isLogin ? 
                    <NavLink to="/profil" aria-label="Navigation vers la page profil" className="container-profil w-10 h-10 flex items-center justify-center rounded-full border-primary border-solid  cursor-pointer box-border">
                        <img className="w-full rounded-full" src={`${VITE_BACKEND_URL}${user.profil_picture}`} alt="Profil de l'utilisateur" />
                    </NavLink>                    
                    : <p className="cursor-pointer" aria-label="Ouvre un formulaire de connexion" onClick={() => openModal('login')}>Connexion</p>}
                </nav>
                <div className='container-burgerMenu-icon sm:block md:block lg:hidden xl:hidden text-light light-mode:text-dark-black' onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            {/* {menuOpen && (
                <BurgerMenu />
            )} */}
        </header>
    );
};

export default Header;