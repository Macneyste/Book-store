import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// main.jsx waa meesha ugu horraysa ee React app-ku ka bilaabmo.
// Halkan ayaan root DOM-ka ku xirnay App component-ka si browser-ku u arko UI-ga.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter wuxuu app-ka siinayaa awoodda route navigation-ka */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
