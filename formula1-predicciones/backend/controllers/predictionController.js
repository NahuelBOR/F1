const Prediction = require('../models/Prediction');
const User = require('../models/User');

exports.createPrediction = async (req, res) => {
  const { race, predictions } = req.body;
  const user = await User.findById(req.user.id);
  const prediction = new Prediction({ user: user._id, race, predictions });
  await prediction.save();
  user.predictions.push(prediction._id);
  await user.save();
  res.status(201).json({ message: 'Prediction created successfully' });
};

exports.getPredictions = async (req, res) => {
  const predictions = await Prediction.find({ user: req.user.id });
  res.json(predictions);
};