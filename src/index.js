import React from 'react';
import ReactDOM from 'react-dom/client';
// Importamos Bootstrap AQUÍ para que funcione en toda la app
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// Buscamos el div con id "root" en el archivo index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos la aplicación dentro de ese div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);