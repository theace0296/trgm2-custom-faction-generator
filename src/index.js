import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components';
import reportWebVitals from './reportWebVitals';

import './index.css';
import './services/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
