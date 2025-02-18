import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../components/layout/Layout';
import BeerTypes from '../components/beer/BeerType';
import Beer from '../components/beer/Beer';
import Bar from '../components/bar/Bar';
import Contact from '../pages/Contact';
import Profil from '../pages/Profil';
import BarPage from '../pages/barPage/BarPage';
import BeerPage from '../pages/beerPage/BeerPage';
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
        element: <Beer />,
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
        path: '/bars/',
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