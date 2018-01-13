const Article = require('../models/articleModel');

const allArticle = (req,res) => {
  Article.find().then(articles => {
    res.send(articles);
  }).catch(err => {
    res.send(err);
  });
}

module.exports = {
  allArticle
};
