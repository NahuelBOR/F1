const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  race: { type: String, required: true },
  results: {
    pole: { type: String, required: true },
    first: { type: String, required: true },
    second: { type: String, required: true },
    third: { type: String, required: true }
  }
});

module.exports = mongoose.model('Result', ResultSchema);