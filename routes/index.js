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

// List Articles Based on User Id
router.get('/article/all/:userid',controlArticle.articleByUser);

// Update Article Status Based on User Id
router.post('/article/:postId/:status',controlArticle.updateReadStatus);

module.exports = router;
