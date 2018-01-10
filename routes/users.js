const router = require('express').Router()
      User   = require('../controllers/userController')

router.post('/', User.create)

module.exports = router
