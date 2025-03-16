const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  displayName : { type: String },
  profileImage : { type: String },
  predictions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prediction' }],
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);