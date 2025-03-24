// src/components/AddRaceResult.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const AddRaceResult = () => {
  const [race, setRace] = useState('');
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/race-results/save',
        {
          race,
          results: { first, second, third },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Resultado de la carrera guardado:', response.data);
      setMessage('Resultado de la carrera guardado exitosamente');
      setTimeout(() => navigate('/profile'), 2000); // Redirigir al perfil después de 2 segundos
    } catch (error) {
      console.error('Error al guardar el resultado:', error.response?.data || error.message);
      setMessage('Error al guardar el resultado');
    }
  };

// src/components/AddRaceResult.js
return (
    <div>
      <h2>Agregar Resultado de Carrera</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Guardar Resultado</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRaceResult;