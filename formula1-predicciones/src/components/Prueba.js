// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  const navigate = useNavigate();

  // Obtener los datos del perfil al cargar el componente
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { profileImage, displayName } = response.data;
        const hola = response.data;
        console.log(hola);
        
        setProfileImage(profileImage || '');
        setDisplayName(displayName || '');
        setUser({ role }); // Guardar el rol del usuario
      } catch (error) {
        console.error('Error al obtener el perfil:', error.response?.data || error.message);
        setMessage('Error al obtener el perfil');
      }
    };

    fetchProfile();
  }, []);

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  // Resto del código...