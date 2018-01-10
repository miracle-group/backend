const {DB_PATH} = require('../secrets.config')
      mongoose  = require('mongoose').connect(DB_PATH);

const userSchema = mongoose.Schema({
  username: String,
  password: String
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
