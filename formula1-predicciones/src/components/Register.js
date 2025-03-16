import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre de usuario
    if (username.length < 5) {
      newErrors.username = 'El nombre de usuario debe tener al menos 5 caracteres';
    }

    // Validar contraseña
    if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Detener el envío si hay errores
    }

    try {
      // Enviar los datos al backend
      const response = await axios.post(/*`${process.env.REACT_APP_API_URL}/api/auth/register`*/'http://localhost:5000/api/auth/register', {
        username,
        password,
        role,
      });

      console.log('Usuario registrado:', response.data);
      alert('Usuario registrado exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);
      setBackendError(error.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      {backendError && <p style={{ color: 'red' }}>{backendError}</p>}
      <div>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <div>
        <label>Rol:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;