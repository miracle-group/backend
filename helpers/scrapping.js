const ObjectId = require('mongoose').Types.ObjectId;

const Article = require('../models/articleModel');
const Conjuction = require('../models/conjuctionModel');

const createConjuction = async (object,io) => {
  // UserId, Times, Preferences
  let totalDuration = 0;
  const {times} = object;
  const {userId} = object;
  const {deleted} = object;
  const preferences = object.preferences.map(category => {
    return category.replace(/\W+/g,'-');
  });
  // Delete User Preferences if any
  deleted.forEach(category => {
    Conjuction.deleteMany({
      category : category,
      userId : ObjectId(userId)
    }).then(response => {
      console.log('Deleted');
    });
  });
  // Edit Jika Ada
  io.once('connection',(socket) => {
    Article.find().then(data => {
      data.forEach(article => {
        article._doc.categories.forEach(category => {
          preferences.forEach(userCat => {
            if(userCat == category){
              if(totalDuration < times){
                totalDuration+=article.read_time;
                Conjuction.findOne({
                  userId : ObjectId(userId),
                  postId : ObjectId(article._id)
                }).then(result => {
                  if(!result){
                    new Conjuction({
                      userId : userId,
                      postId : article._id,
                      category : userCat,
                      read_status : false
                    }).save().then(response => {
                      console.log(response);
                      Conjuction.findOne({
                        _id : ObjectId(response._id)
                      }).populate('postId').then(article => {
                        socket.emit(`conjuction-${userId}`,{response : article});
                        console.log('Emmited');
                      });
                    });
                  }
                }).catch(err => {
                  console.log(err);
                });
              }
            }
          });
        });
      });
    }).catch(err => {
      console.log(err);
    });
  });
}

module.exports = {
  createConjuction
};
