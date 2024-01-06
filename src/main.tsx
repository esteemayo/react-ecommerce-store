import React from 'react';
import ReactDOM from 'react-dom/client';

import QueryProvider from './providers/QueryProvider.tsx';
import AppThemeProvider from './providers/ThemeProvider.tsx';
import CartProvider from './providers/CartProvider.tsx';

import App from './App.tsx';

import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <CartProvider>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </CartProvider>
    </QueryProvider>
  </React.StrictMode>
);
