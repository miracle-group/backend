const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {type: String},
  name: {type: String},
  preferences: [{type: String}],
  times: {type: Number},
  history: [{type: String}],
  validation: {type: String},
  createdt: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema)
module.exports = User
