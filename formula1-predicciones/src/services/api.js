// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // URL del backend

// Función para registrar un usuario
export const registerUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, password });
  return response.data;
};

// Función para iniciar sesión
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};