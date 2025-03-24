// backend/models/RaceResult.js
const mongoose = require('mongoose');

const RaceResultSchema = new mongoose.Schema({
  race: { type: String, required: true, unique: true }, // Nombre de la carrera (ej: "Monaco GP")
  results: {
    first: { type: String, required: true }, // Resultado para el primer lugar
    second: { type: String, required: true }, // Resultado para el segundo lugar
    third: { type: String, required: true }, // Resultado para el tercer lugar
  },
});

module.exports = mongoose.model('RaceResult', RaceResultSchema);