// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes'); // Importar rutas de autenticación
const profileRoutes = require('./routes/profileRoutes'); // Importar las rutas de perfil

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Rutas
app.use('/api/auth', authRoutes); // Usar rutas de autenticación
app.use('/api/profile', profileRoutes); // Montar las rutas de perfil

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Fórmula 1');
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));