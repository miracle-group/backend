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
    req.metadata.forEach((meta) => {
      let newArticle = new Article ({
        postID: meta.postID,
        thumbnail: `http://${meta.photo}`,
        link: meta.link,
        createdAt: meta.createdAt,
        author: meta.author,
        title: meta.title,
        content: meta.content,
        categories: meta.categories,
        read_time: meta.times
      })
      newArticle.save().then((dataArticles) => {
        resolve(dataArticles)
      }).catch((err) => {
        reject(err)
      })
    })
  })
}


module.exports = {
  findAllArticles,
  addArticle
}
