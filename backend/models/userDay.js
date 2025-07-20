const mongoose = require('mongoose');

const userDaySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dayNumber: Number,
  tasks: [String],
  completed: [Boolean],
  title: { type: String, default: "" },
  quote: { type: String, default: "" },
});

module.exports = mongoose.model('UserDay', userDaySchema);
