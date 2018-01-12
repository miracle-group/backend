const router = require('express').Router()

const category = require('../helpers/category')
const articles = require('../helpers/listArticles')

router.get('/category', category.getCategory)
router.get('/articles', articles.getListMedium)

module.exports = router;
