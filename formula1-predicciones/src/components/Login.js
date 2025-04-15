// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(/*`${process.env.REACT_APP_API_URL}/api/auth/login`*/`/api/auth/login`, {
        username,
        password,
      });

      console.log('Inicio de sesión exitoso:', response.data);
      localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
      navigate('/profile'); // Redirigir a la página de perfil
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      console.log(error.response?.data?.message);
      
      setError(error.response?.data?.message || 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;