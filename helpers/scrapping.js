const Article = require('../models/articleModel');
const Conjuction = require('../models/conjuctionModel');

const createConjuction = (object) => {
  let totalDuration = 0;
  const {times} = object;
  const {userId} = object;
  const preferences = object.preferences.map(category => {
    return category.replace(/\W+/g,'-');
  });
  Article.find().then(data => {
    data.forEach(article => {
      article._doc.categories.forEach(category => {
        preferences.forEach(userCat => {
          if(userCat == category){
            if(totalDuration < times){
              totalDuration+=article.read_time;
              new Conjuction({
                userId : userId,
                postId : article._id,
                read_status : false
              }).save().then(response => {
                console.log(response);
              });
            }
          }
        });
      });
    });
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  createConjuction
};
