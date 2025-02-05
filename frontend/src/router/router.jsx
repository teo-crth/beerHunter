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
import BeerTypePage from '../pages/beerTypePage/BeerTypePage';

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
        path: '/type-de-biere',
        element: <BeerTypes />,
      },
      {
        path: '/type-de-biere/:type',
        element: <Beer />,
      },
      {
        path: '/bieres/:id',
        element: <Beer />,
      },
      {
        path: '/bars/:id',
        element: <Bar />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'profil',
        element: <Profil />,
      },
      {
        path: 'BeerPage',
        element: <BeerPage />,
      },
      {
        path: 'BarPage',
        element: <BarPage />,
      },
      {
        path: '/beer-types', // Route enfant
        element: <BeerTypePage />,
      },
    ],
  },
]);

export default router;