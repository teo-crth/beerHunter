import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon } from '@fortawesome/free-solid-svg-icons';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import { AppContext } from '../../context/context';
import logo from '../../assets/logo/beerHunter-letter-white.webp';

const Header = () => {
    // Etat pour gérer l'ouverture du menu burger
    const { menuOpen, setMenuOpen } = useContext(AppContext);
    const { isDarkMode, toggleTheme } = useContext(AppContext);
    // Fonction pour alterner l'état du menu burger
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <NavLink to="/beerhunter" className={({ isActive }) => isActive ? 'active' : ''}><img src={logo} alt="Logo table avec des livres" /></NavLink>
                <nav className="nav-desktop">
                    <NavLink to="/beerhunter" className={({ isActive }) => isActive ? 'active' : ''}>Accueil</NavLink>
                    <NavLink to="/beerhunter/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                    <FontAwesomeIcon className="dark-mode-icon" icon={faMoon} onClick={toggleTheme}/>
                </nav>
            <div className='container-burgerMenu-icon' onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            {menuOpen && (
                <BurgerMenu />
            )}
        </header>
    );
};

export default Header;