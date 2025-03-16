// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la Competencia de Fórmula 1</h1>
      <p>Esta es la pantalla principal.</p>

      <div style={{ marginTop: '20px' }}>
        <Link to="/register" style={{ marginRight: '10px' }}>
          <button>Registrarse</button>
        </Link>
        <Link to="/login" style={{ marginRight: '10px' }}>
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/position">
          <button>Posiciones</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;