// backend/controllers/raceResultController.js
const User = require('../models/User');
const RaceResult = require('../models/RaceResult');

exports.saveRaceResult = async (req, res) => {
  const { race, results } = req.body;

  try {
    // Verificar si el usuario es admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo los administradores pueden ingresar resultados' });
    }

    // Guardar el resultado de la carrera
    const raceResult = new RaceResult({ race, results });
    await raceResult.save();

    // Calcular puntos para las predicciones de esta carrera
    const users = await User.find({});
    for (const user of users) {
      const prediction = user.predictions.find((p) => p.race === race);
      if (prediction) {
        let points = 0;

        if (prediction.predictions.first === results.first) points += 3;
        if (prediction.predictions.second === results.second) points += 3;
        if (prediction.predictions.third === results.third) points += 3;

        if (prediction.predictions.first === results.second) points += 1;
        if (prediction.predictions.first === results.third) points += 1;

        if (prediction.predictions.second === results.first) points += 1;
        if (prediction.predictions.second === results.third) points += 1;

        if (prediction.predictions.third === results.first) points += 1;
        if (prediction.predictions.third === results.second) points += 1;

        prediction.points = points;
        user.totalPoints += points; // Actualizar los puntos totales del usuario
        await user.save();
      }
    }

    res.status(201).json({ message: 'Resultado de la carrera guardado exitosamente', raceResult });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el resultado de la carrera', error });
  }
};