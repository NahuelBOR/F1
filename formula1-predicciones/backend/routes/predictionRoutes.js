// backend/routes/predictionRoutes.js
const express = require('express');
const { savePrediction } = require('../controllers/predictionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para guardar una predicción
router.post('/save', authMiddleware, savePrediction);

module.exports = router;