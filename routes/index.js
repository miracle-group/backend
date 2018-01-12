const router = require('express').Router()

const category = require('../helpers/category')
const articles = require('../helpers/listArticles')
const rssScrape = require('../helpers/rssCrape')
const combined = require('../helpers/combined')

router.get('/', function (req,res) {
  res.send('OKE')
})
router.get('/category', category.getCategory)
router.get('/articles', articles.getListMedium)
router.get('/rss_scrape', rssScrape.getContent)
router.get('/combined', combined.getCombined)

module.exports = router;
