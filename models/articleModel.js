const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({

  postID: String,
  thumbnail: String,
  createdAt: {type: Date, default: Date.now },
  author: String,
  title: String,
  tags: Array,
  read_time: Number,
  preview : String,
  content: String,
  rate : {
    type : Array,
    default : 5
  }
});

const Article = mongoose.model('Article',articleSchema);

module.exports = Article
