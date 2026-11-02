import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BrandingProvider } from './contexts/BrandingContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrandingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BrandingProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
