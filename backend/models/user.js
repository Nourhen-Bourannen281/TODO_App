const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // email utilisé comme username
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
