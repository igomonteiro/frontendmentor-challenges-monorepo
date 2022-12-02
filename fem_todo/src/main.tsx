import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AppThemeProvider } from './contexts/AppThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppThemeProvider>
    <App />
  </AppThemeProvider>
);
