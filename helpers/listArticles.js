var request = require('request');
var cheerio = require('cheerio');

 const getListMedium = function (req,res) {
  request('https://medium.com/topic/technology', function (error, response, html) {
    let metadatas = []
    if (!error && response.statusCode == 200) {
      let result = []
      var $ = cheerio.load(html);
      $('.u-block.u-backgroundSizeCover.u-backgroundOriginBorderBox').each(function(i, element){
        let temp = element.attribs.style
        let split = temp.split(';').slice(0,1).join('')
        let spasi = split.split(' ').join('')
        let spasi2 = spasi.split(':').pop().substr(2, spasi.split(':').pop().length-4)
        var url = element.attribs.href
        var label = element.attribs['aria-label']
        var gambar = spasi2
        let metadata = {
          id: i+1,
          url : url,
          photo: gambar,
          title: label
        }
        metadatas.push(metadata)
      })

      $('.u-flex0.u-sizeFullWidth').each((j, content) => {
        let description = String(content.next.children[0].children[0].data)
        if(metadatas[j]){
          metadatas[j]['description'] = description
        }
      })

      $('.u-flex1.u-noWrapWithEllipsis').each(function(k, content){
        let times = content.children[0].children[0].parent.next.children[0].next.next.attribs.title
        let hasil = times.split(' ').shift()
        let number = Number(hasil)

        if(metadatas[k]) {
          metadatas[k]['times'] = number
        }
      })

      $('.u-borderBox.u-flexColumn.uiScale.uiScale-ui--small.uiScale-caption--small').each((m, content) => {
        let postId = content.parent.parent.attribs['data-post-id']
        if(metadatas[m]) {
          metadatas[m]['postID'] = postId
        }
      })

      // for (var i = 0; i < metadatas.length; i++) {
      //   // console.log(metadatas[i].url);
      //   request(metadatas[i].url, function (error, response, html) {
      //     console.log('masuk sini');
      //   })
      // }


      res.send(metadatas);
    }
  });
}

const getCategory = function (req,res) {
  request('https://medium.com/topics', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var Preferences = []
      $('.link.link--noUnderline.u-baseColor--link.u-flex1.u-uiDisplayBold.u-fontSize20').each(function(i, element){
        // console.log(element.children[0].data);
        var topic_url = element.attribs.href
        var topic_name = element.children[0].data

        var metadata = {
          url : topic_url,
          name : topic_name

        };
        Preferences.push(metadata)
      });
      res.send(Preferences)
    }
  });
}

module.exports = {
  getListMedium,
  getCategory
}
