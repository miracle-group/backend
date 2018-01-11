const mongoose = require('mongoose')
const Article = require('../models/articleModel')

// Find all articles
let findAllArticles = (req, res) => {
  return new Promise((resolve, reject) => {
    Article.find().then((dataArticles) => {
      resolve(dataArticles)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// Post article
let addArticle = (req, res) => {
  return new Promise((resolve, reject) => {
    let newArticle = Article(
      {
        title: req.title,
        tags: req.tags,
        read_time: req.read_time,
        content: req.content,
        isRead: req.isRead
      }
    )
    newArticle.save().then((dataArticles) => {
      resolve(dataArticles)
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports = {
  findAllArticles,
  addArticle
}
