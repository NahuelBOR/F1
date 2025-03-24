// backend/models/User.js
const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  race: { type: String, required: true }, // Nombre de la carrera
  predictions: {
    first: { type: String, required: true }, // Predicción para el primer lugar
    second: { type: String, required: true }, // Predicción para el segundo lugar
    third: { type: String, required: true }, // Predicción para el tercer lugar
  },
  points: { type: Number, default: 0 }, // Puntos obtenidos por esta predicción
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profileImage: { type: String, default: '' },
  displayName: { type: String, default: '' },
  predictions: [PredictionSchema], // Array de predicciones
  totalPoints: { type: Number, default: 0 }, // Puntos totales del usuario
});

module.exports = mongoose.model('User', UserSchema);

/*const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  displayName : { type: String },
  profileImage : { type: String },
  predictions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prediction' }],
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);*/