const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema(
  {
    title: String,
    tags: [String],
    read_time: Number,
    content: String,
    read: Boolean
  }
)

let Article = mongoose.model('Article',articleSchema)
module.exports = Article
