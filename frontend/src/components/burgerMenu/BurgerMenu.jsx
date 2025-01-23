import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../../context/context';
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
        <div className='container-burgerMenu'>
            <div className="container-close-icon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <nav className='nav-mobile'>
                <NavLink to="/beerhunter" className={({ isActive }) => isActive ? 'active' : ''}>Accueil</NavLink>
                <NavLink to="/beerhunter/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                <FontAwesomeIcon className="dark-mode-icon" icon={faMoon} onClick={toggleTheme} />

            </nav>
        </div>
    );
};

export default BurgerMenu;