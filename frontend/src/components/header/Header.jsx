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
        <header className="flex justify-between items-center w-full bg-black-color px-2.5 shadow-md">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}><img src={logo} alt="Logo table avec des livres" className='w-50' /></NavLink>
            <div className="container-nav flex justify-around items-center gap-10">
                <nav className="nav-desktop hidden lg:flex xl:flex gap-10 items-center text-primary-color fontFamily-title">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active fontFamily-title' : 'fontFamily-title'}>Accueil</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                    <div className="container-theme-mode-icon w-10 h-10 p-3 flex items-center justify-center rounded-full border border-solid cursor-pointer box-border">
                        <FontAwesomeIcon className="dark-mode-icon text-2xl w-6 h-6 text-white" icon={faMoon} onClick={toggleTheme}/>
                    </div>
                </nav>
                <div className='container-burgerMenu-icon sm:block md:block lg:hidden xl:hidden text-white' onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            {menuOpen && (
                <BurgerMenu />
            )}
        </header>
    );
};

export default Header;