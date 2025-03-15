const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  race: { type: String, required: true },
  predictions: {
    pole: { type: String, required: true },
    first: { type: String, required: true },
    second: { type: String, required: true },
    third: { type: String, required: true }
  },
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model('Prediction', PredictionSchema);