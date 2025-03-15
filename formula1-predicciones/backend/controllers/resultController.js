const Result = require('../models/Result');
const Prediction = require('../models/Prediction');
const User = require('../models/User');

exports.createResult = async (req, res) => {
  const { race, results } = req.body;
  const result = new Result({ race, results });
  await result.save();

  // Calcular puntos y actualizar usuarios
  const predictions = await Prediction.find({ race });
  predictions.forEach(async (prediction) => {
    let points = 0;
    if (prediction.predictions.pole === results.pole) points += 2;
    if (prediction.predictions.first === results.first) points += 5;
    if (prediction.predictions.second === results.second) points += 3;
    if (prediction.predictions.third === results.third) points += 1;

    prediction.points = points;
    await prediction.save();

    const user = await User.findById(prediction.user);
    user.points += points;
    await user.save();
  });

  res.status(201).json({ message: 'Result created successfully' });
};