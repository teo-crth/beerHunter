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
    const { menuOpen, setMenuOpen } = useContext(AppContext);
    const { isDarkMode, toggleTheme } = useContext(AppContext);
    // Fonction pour alterner l'état du menu burger
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="flex justify-between items-center w-full px-2.5 shadow-md bg-dark-black light-mode:bg-light">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}><img src={isDarkMode ? logo : logoLight} alt="Logo table avec des livres" className='w-50' /></NavLink>
            <div className="container-nav flex justify-around items-center gap-10">
                <nav className="nav-desktop hidden lg:flex xl:flex gap-10 items-center text-primary fontFamily-title">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active font-title' : 'font-title'}>Accueil</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                    <NavLink to="/profil" className="container-theme-mode-icon w-10 h-10 flex items-center justify-center rounded-full border border-solid cursor-pointer box-border">
                        <img className="dark-mode-icon text-2xl rounded-full w-full light-mode:text-dark-black text-light shadow-primary" src='/src/assets/default-profil-picture.webp'/>
                    </NavLink>
                    {/* <div className="container-theme-mode-icon w-10 h-10 p-3 flex items-center justify-center rounded-full border border-solid cursor-pointer box-border">
                        <FontAwesomeIcon className="dark-mode-icon text-2xl w-6 h-6 light-mode:text-dark-black text-light shadow-primary" icon={faMoon} onClick={toggleTheme}/>
                    </div> */}
                </nav>
                <div className='container-burgerMenu-icon sm:block md:block lg:hidden xl:hidden text-light light-mode:text-dark-black' onClick={toggleMenu}>
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