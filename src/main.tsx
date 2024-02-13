import ReactDOM from 'react-dom/client';
import React from 'react';
import * as Sentry from '@sentry/react';

import QueryProvider from './providers/QueryProvider.tsx';
import CartProvider from './providers/CartProvider.tsx';
import AppThemeProvider from './providers/ThemeProvider.tsx';

import App from './App.tsx';

import './styles/global.scss';

Sentry.init({
  dsn: 'https://f4d4069cbfc709cd24ee4b2ca42ad844@o418463.ingest.sentry.io/4506739789660160',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
