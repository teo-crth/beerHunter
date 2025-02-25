import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../components/Layout/Layout';
import BeerOfType from '../components/Beer/BeerOfType';
import Contact from '../pages/Contact';
import Profil from '../pages/Profil';
import BarPage from '../pages/BarPage';
import BeerPage from '../pages/BeerPage';
import BeerTypePage from '../pages/BeerTypePage';

const router = createBrowserRouter([
  {
    path: '/', // Route parent
    element: <Layout />, // Layout contenant Header et Footer
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // Route par défaut pour "/"
        element: <Home />,
      },
      {
        path: 'types-de-biere',
        element: <BeerTypePage />,
      },
      {
        path: 'types-de-biere/:type',
        element: <BeerOfType />,
      },
      {
        path: 'bieres/:id',
        element: <BeerPage />,
      },
      {
        path: 'bars/:id',
        element: <BarPage />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'profil',
        element: <Profil />,
      }
    ],
  },
]);

export default router;