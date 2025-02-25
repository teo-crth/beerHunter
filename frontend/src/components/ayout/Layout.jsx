import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../../context/context';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BurgerMenu from '../urgerMenu/BurgerMenu';

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