var request = require('request');
var cheerio = require('cheerio');

let arr = []

const getCategory = (req, res) => {
  return new Promise ((resolve, reject) => {
    request('https://medium.com/topics', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var Preferences = []
        $('.link.link--noUnderline.u-baseColor--link.u-flex1.u-uiDisplayBold.u-fontSize20').each((i, element) => {
          var topic_name = element.children[0].data
          arr.push(topic_name.toLowerCase())
        });
        resolve(arr)
      }
    })
  })
}

const getListMedium = (req,res) => {
 return new Promise ((resolve, reject) => {
   getCategory().then((data) => {
     let bigData = []
     data.forEach( async (dataCategory) => {
       await request(`https://medium.com/topic/${data[2]}`, (error, response, html) => {
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
            bigData.push(metadatas)
            // resolve(metadatas)
          }
          resolve(bigData)
        })
     })
   })
 })
}

module.exports = {
  getListMedium
}
