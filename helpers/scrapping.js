const ObjectId = require('mongoose').Types.ObjectId;

const Article = require('../models/articleModel');
const Conjuction = require('../models/conjuctionModel');

const createConjuction = async (object,io) => {
  // UserId, Times, Preferences
  io.on('connection',(socket) => {
    let totalDuration = 0;
    const {times} = object;
    const {userId} = object;
    const preferences = object.preferences.map(category => {
      return category.replace(/\W+/g,'-');
    });
    // Edit Jika Ada
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
                      Article.findOne({_id : ObjectId(article._id)}).then(article => {
                        socket.emit(`conjuction-${userId}`,{response : article});
                      });
                      console.log(response);
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
