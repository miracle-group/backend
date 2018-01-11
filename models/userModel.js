const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  preferences: Array,
  times: Number,
  validation : String,
  history: Array,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User
