// backend/routes/profileRoutes.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Ruta para obtener el perfil
router.get('/', authMiddleware, getProfile);

// Ruta para actualizar el perfil
router.post('/update', authMiddleware, upload.single('image'), updateProfile);

module.exports = router;