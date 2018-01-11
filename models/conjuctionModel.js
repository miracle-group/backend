const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conjutionSchema = new Schema({
  userId : [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  postId : [{
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }],
  read_status : Boolean
});

const Conjuction = mongoose.model('Conjuction',conjutionSchema);

module.exports = Conjuction;
