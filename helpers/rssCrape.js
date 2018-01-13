const parser = require('parse-rss')
const readingTime = require('reading-time');
const request = require('request');
const cheerio = require('cheerio');

let dataArr = []

const getCategory = (req, res) => {
  return new Promise ((resolve, reject) => {
    request('https://medium.com/topics', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var Preferences = []
        $('.link.link--noUnderline.u-baseColor--link.u-flex1.u-uiDisplayBold.u-fontSize20').each((i, element) => {
          var topic_name = element.attribs.href
          dataArr.push(topic_name.toLowerCase())
        });
        resolve(dataArr)
      }
    })
  })
}

let getContent = (req, res) => {
  return new Promise ((resolve, reject) => {
    getCategory().then((dataCategory) => {
      let bigData = []
      dataCategory.forEach( async (newData, i) => {
        await parser(`https://medium.com/feed/topic/${newData}`, (err, rss) => {
          if(err){
            console.log(err);
          } else {
            let data =[]
            rss.forEach((dataRss) => {
              let stats = readingTime(dataRss.description)
              // Maniuplating Guid
              let guidSplitted = dataRss.guid.split('/')
              let guidId = guidSplitted[4]
              let obj = {
                newData: newData,
                link: dataRss.link,
                guid: guidId,
                createdAt: dataRss.date,
                author: dataRss.author,
                title: dataRss.title,
                content: dataRss.description,
                categories: dataRss.categories,
                read_time: stats.text
              }
              data.push(obj)
            })
            bigData.push(data)
          }
          // if (bigData.length === dataCategory.length) {
          //   resolve(bigData)
          // }
          resolve(bigData)
        })
      })
    })
  })
}

module.exports = {
  getContent
}
