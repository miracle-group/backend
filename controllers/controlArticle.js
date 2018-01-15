const Conjuction = require('../models/conjuctionModel');

const articleByUser = (req,res) => {
  Conjuction.find({
    userId : req.params.userid
  }).populate('postId').then(response => {
    res.send(response);
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  articleByUser
};
