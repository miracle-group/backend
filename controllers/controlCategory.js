const ObjectId = require('mongoose').Types.ObjectId;
const request = require('request');
const cheerio = require('cheerio');

const User = require('../models/userModel');

const allCategory = (req,res) => {
  request('https://medium.com/topics',(error,response,html) => {
    if(!error && response.statusCode == 200){
      const $ = cheerio.load(html);
      let preferences = [];
      $('.link.link--noUnderline.u-baseColor--link.u-flex1.u-uiDisplayBold.u-fontSize20').each((i, element) => {
        const topic_url = element.attribs.href;
        const topic_name = element.children[0].data;
        var metadata = {
          url : topic_url,
          name : topic_name
        };
        preferences.push(metadata);
      });
      res.send(preferences);
    }
  });
}

const byCategory = (req,res) => {
  request('https://medium.com/topic/technology',(error, response, html) => {
    let metadatas = [];
    if(!error && response.statusCode == 200){
      let result = [];
      const $ = cheerio.load(html);
      $('.u-block.u-backgroundSizeCover.u-backgroundOriginBorderBox').each((i, element) => {
        let temp = element.attribs.style
        let split = temp.split(';').slice(0,1).join('')
        let spasi = split.split(' ').join('')
        let spasi2 = spasi.split(':').pop().substr(2, spasi.split(':').pop().length-4)
        let url = element.attribs.href
        let label = element.attribs['aria-label']
        let gambar = spasi2
        let metadata = {
          id: i+1,
          url : url,
          photo: gambar,
          title: label
        }
        metadatas.push(metadata);
      });
      $('.u-flex0.u-sizeFullWidth').each((j, content) => {
        let description = String(content.next.children[0].children[0].data)
        if(metadatas[j]){
          metadatas[j]['description'] = description
        }
      });
      $('.u-flex1.u-noWrapWithEllipsis').each(function(k, content){
        let times = content.children[0].children[0].parent.next.children[0].next.next.attribs.title
        let hasil = times.split(' ').shift();
        let number = Number(hasil);
        if(metadatas[k]) {
          metadatas[k]['times'] = number
        }
      });
      $('.u-borderBox.u-flexColumn.uiScale.uiScale-ui--small.uiScale-caption--small').each((m, content) => {
        let postId = content.parent.parent.attribs['data-post-id']
        if(metadatas[m]) {
          metadatas[m]['postID'] = postId
        }
      });
      res.send(metadatas);
    }
  });
}

const updateUserCategoryRate = (req,res) => {
  User.findOne({
    _id : ObjectId(req.params.userid)
  }).then(user => {
    const {preferences} = user;
    const newPreferences = preferences.map(category => {
      category.value += 1;
      return category;
    });
    User.updateOne({
      _id : ObjectId(req.params.userid)
    },{
      preferences : newPreferences
    }).then(response => {
      User.findOne({
        _id : ObjectId(req.params.userid)
      }).then(updatedUser => {
        res.send(updatedUser.preferences);
      });
    });
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  allCategory,
  byCategory,
  updateUserCategoryRate
};
