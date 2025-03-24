// backend/routes/raceResultRoutes.js
const express = require('express');
const { saveRaceResult } = require('../controllers/raceResultController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para guardar el resultado de una carrera (solo para admin)
router.post('/save', authMiddleware, saveRaceResult);

module.exports = router;