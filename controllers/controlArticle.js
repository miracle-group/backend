const ObjectId = require('mongoose').Types.ObjectId;

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

const updateReadStatus = (req,res) => {
  Conjuction.updateOne({
    _id : ObjectId(req.params.postId)
  },{
    read_status : req.params.status
  }).then(response => {
    res.send(response);
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  articleByUser,
  updateReadStatus
};
