const User = require('../models/userModel');

const create = (req, res) => {
  User.create(req.body)
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
}

module.exports = {
  create
}
