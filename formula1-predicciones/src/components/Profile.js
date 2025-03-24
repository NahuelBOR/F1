// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir

// src/components/Profile.js
const races = [
  "Gran Premio de Australia",
  "Gran Premio de China",
  "Gran Premio de Japan",
  "Gran Premio de Bahrain",
  "Gran Premio de Saudi Arabia",
  "Gran Premio de Miami",
  "Gran Premio de Emilia-Romagna",
  "Gran Premio de Monaco",
  "Gran Premio de España",
  "Gran Premio de Canada",
  "Gran Premio de Austria",
  "Gran Premio de Gran Bretaña",
  "Gran Premio de Bélgica",
  "Gran Premio de Hungría",
  "Gran Premio de Países Bajos",
  "Gran Premio de Italia",
  "Gran Premio de Azerbaijan",
  "Gran Premio de Singapur",
  "Gran Premio de Estados Unidos",
  "Gran Premio de la Ciudad de México",
  "Gran Premio de São Paulo",
  "Gran Premio de Las Vegas",
  "Gran Premio de Qatar",
  "Gran Premio de Abu Dhabi"
];

const drivers = [
  "Lewis Hamilton",
  "Max Verstappen",
  "Charles Leclerc",
  "Oscar Piastri",
  "Carlos Sainz",
  "Lando Norris",
  "George Russell",
  "Fernando Alonso",
  "Esteban Ocon",
  "Pierre Gasly",
  "Kimi Antonelli",
  "Yuki Tsunoda",
  "Oliver Bearman",
  "Lance Stroll",
  "Isack Hadjar",
  "Liam Lawson",
  "Alexander Albon",
  "Gabriel Bortoleto",
  "Nico Hulkenberg",
  "Jack Doohan",
  "Franco Colapinto"
];

const Profile = () => {
  const [profileImage, setProfileImage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [race, setRace] = useState('');
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [role, setRole] = useState(null);


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

        const { profileImage, displayName, totalPoints, role } = response.data;
        setProfileImage(profileImage || ''); // Si no hay imagen, se deja vacío
        setDisplayName(displayName || '');
        setTotalPoints(totalPoints || 0);
        setRole(role);
      } catch (error) {
        console.error('Error al obtener el perfil:', error.response?.data || error.message);
        setMessage('Error al obtener el perfil');
      }
    };

    fetchProfile();
  }, []);

  const handlePredictionSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/predictions/save',
        {
          race,
          predictions: { first, second, third },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log();

      window.location.reload();
      console.log('Predicción guardada:', response.data);
      alert('Predicción guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la predicción:', error.response?.data || error.message);
      alert('Error al guardar la predicción');
    }
  };

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

      <div>
        <h3>Puntos totales: {totalPoints}</h3>
      </div>

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

      <div>
        {/* Formulario para guardar predicciones */}
        <form onSubmit={handlePredictionSubmit}>
          <h3>Guardar Predicción</h3>
          <div>
            <label>Carrera:</label>
            <select value={race} onChange={(e) => setRace(e.target.value)} required>
              <option value="">Selecciona una carrera</option>
              {races.map((raceName, index) => (
                <option key={index} value={raceName}>
                  {raceName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Primer Lugar:</label>
            <select value={first} onChange={(e) => setFirst(e.target.value)} required>
              <option value="">Selecciona un corredor</option>
              {drivers.map((driver, index) => (
                <option key={index} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Segundo Lugar:</label>
            <select value={second} onChange={(e) => setSecond(e.target.value)} required>
              <option value="">Selecciona un corredor</option>
              {drivers.map((driver, index) => (
                <option key={index} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tercer Lugar:</label>
            <select value={third} onChange={(e) => setThird(e.target.value)} required>
              <option value="">Selecciona un corredor</option>
              {drivers.map((driver, index) => (
                <option key={index} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Guardar Predicción</button>
        </form>
      </div>

      {/* Botón para agregar resultados (solo para admin) */}
      {role && role === 'admin' && (
        <button onClick={() => navigate('/add-race-result')} style={{ marginBottom: '20px' }}>
          Agregar Resultado de Carrera
        </button>
      )}

      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Cerrar Sesión
      </button>

    </div>


  );
};

export default Profile;