const router = require('express').Router();

const controlCategory = require('../controllers/controlCategory');
const controlArticle = require('../controllers/controlArticle');

router.get('/',(req,res) => {
  res.send('API Ready');
});

// List All Categories
router.get('/category/all',controlCategory.allCategory);

// List Articles Based on Category
router.get('/category/:category',controlCategory.byCategory);

// List All Articles
router.get('/article/all',controlArticle.allArticle);

module.exports = router;
