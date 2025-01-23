import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../components/layout/Layout';
import BeerTypes from '../components/beer/BeerType';
import Beer from '../components/beer/Beer';
import Bar from '../components/bar/Bar';
import ContactForm from '../components/contact/ContactForm';
import Profil from '../components/profil/Profil';

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
        element: <ContactForm />,
      },
      {
        path: 'profil', 
        element: <Profil />,
      },
    ],
  },
]);

export default router;