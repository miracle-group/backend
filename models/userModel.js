const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {type: String},
  name: {type: String},
  preferences: [],
  times: {type: Number},
  history: [],
  createdt: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema)
module.exports = User
