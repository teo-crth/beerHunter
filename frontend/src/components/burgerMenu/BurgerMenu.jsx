import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon } from '@fortawesome/free-solid-svg-icons';

const BurgerMenu = () => {
    const { menuOpen, setMenuOpen, isDarkMode, toggleTheme } = useContext(AppContext);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLink = () => {
        setMenuOpen(false);
    };

    return (
        <div className={`container-burgerMenu ${isDarkMode ? 'bg-black text-white shadow-lg' : 'bg-white shadow-md'} flex flex-col justify-start w-[70%] absolute left-0 bottom-0 h-full`}>
            <div className="container-close-icon flex justify-end items-center p-5 cursor-pointer" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <nav className="nav-mobile flex flex-col items-center gap-5 p-5 mt-8 text-xm">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Accueil</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                <div className="container-theme-mode-icon w-10 h-10 p-3 flex items-center justify-center rounded-full border border-solid cursor-pointer box-border">
                    <FontAwesomeIcon className="dark-mode-icon text-lg cursor-pointer" icon={faMoon} onClick={toggleTheme} />
                </div>

            </nav>
        </div>
    );
};

export default BurgerMenu;