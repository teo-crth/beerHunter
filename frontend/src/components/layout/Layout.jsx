import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../../context/context';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import BurgerMenu from '../burgerMenu/BurgerMenu';

const Layout = () => {

  const { menuOpen } = useContext(AppContext);

  return (
    <>
      <Header />
      <main className='min-h-[calc(100vh-159px)]'>
        <Outlet />
      </main>
      <Footer />
      {menuOpen && (
          <BurgerMenu />
      )}
    </>
  );
};

export default Layout;