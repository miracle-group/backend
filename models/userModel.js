const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferences = new Schema({
  name : String,
  value : Number
},{_id : false})

const userSchema = new Schema({
  email: String,
  name: String,
  preferences: [preferences],
  times: {
    type : Number,
    default : 0
  },
  profileImage : String,
  validation : String,
  history: Array,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User
