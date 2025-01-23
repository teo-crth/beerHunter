import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { AppProvider } from './context/context';

import "./App.css";
import './style/global-style.css';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
