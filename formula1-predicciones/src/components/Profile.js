// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir

const Profile = () => {
  const [profileImage, setProfileImage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [message, setMessage] = useState('');
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
        setProfileImage(profileImage || ''); // Si no hay imagen, se deja vacío
        setDisplayName(displayName || ''); // Si no hay nombre, se deja vacío
      } catch (error) {
        console.error('Error al obtener el perfil:', error.response?.data || error.message);
        setMessage('Error al obtener el perfil');
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/home'); // Redirigir a la página de inicio de sesión
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (newProfileImage) formData.append('image', newProfileImage);
    if (newDisplayName) formData.append('displayName', newDisplayName);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Perfil actualizado:', response.data);
      setProfileImage(response.data.profileImage || profileImage); // Actualizar la imagen
      setDisplayName(response.data.displayName || displayName); // Actualizar el nombre
      setNewProfileImage(null); // Limpiar el nuevo archivo de imagen
      setNewDisplayName(''); // Limpiar el nuevo nombre
      setMessage('Perfil actualizado exitosamente');

      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.response?.data || error.message);
      setMessage('Error al actualizar el perfil');
    }
  };

  return (
    <div>
      <h2>Perfil</h2>

      {/* Mostrar la imagen actual */}
      {profileImage && (
        <div>
          <img
            src={profileImage}
            alt="Imagen de perfil"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        </div>
      )}

      {/* Mostrar el nombre actual */}
      {displayName && (
        <div>
          <h3>{displayName}</h3>
        </div>
      )}

      {/* Formulario para actualizar el perfil */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva imagen de perfil:</label>
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </div>
        <div>
          <label>Nuevo nombre para mostrar:</label>
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            placeholder="Ingresa un nuevo nombre"
          />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>

      {/* Mostrar mensajes de éxito o error */}
      {message && <p>{message}</p>}

      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Cerrar Sesión
      </button>
    </div>

    
  );
};

export default Profile;