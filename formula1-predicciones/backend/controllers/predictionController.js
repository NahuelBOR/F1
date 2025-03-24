// backend/controllers/predictionController.js
const User = require('../models/User');

exports.savePrediction = async (req, res) => {
  const { race, predictions } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    // Verificar si el usuario ya hizo una predicción para esta carrera
    const existingPrediction = user.predictions.find((p) => p.race === race);
    if (existingPrediction) {
      return res.status(400).json({ message: 'Ya has hecho una predicción para esta carrera' });
    }

    // Agregar la nueva predicción al array del usuario
    user.predictions.push({ race, predictions });
    await user.save();

    res.status(201).json({ message: 'Predicción guardada exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la predicción', error });
  }
};