const router = require('express').Router()
const User   = require('../controllers/userController')


router.post('/', User.create)


module.exports = router
