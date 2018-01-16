const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  // title: String,
  // tags: Array,
  // read_time: Number,
  // preview : String,
  // content: String
  //
  postID: String,
  thumbnail: String,
  createdAt: {type: Date, default: Date.now },
  author: String,
  title: String,
  tags: Array,
  read_time: Number,
  isRead: {type: Boolean, default: false }

});

const Article = mongoose.model('Article',articleSchema);

module.exports = Article
