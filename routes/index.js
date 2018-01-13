const router = require('express').Router();

const controlCategory = require('../controllers/controlCategory');

router.get('/',(req,res) => {
  res.send('API Ready');
});

// List All Categories
router.get('/category/all',controlCategory.allCategory);

// List Articles Based on Category
router.get('/category/:category',controlCategory.byCategory);

module.exports = router;
