const router = require('express').Router()
const parser = require('parse-rss')
const readingTime = require('reading-time');

let dataArr = ['javascript', 'technology']

router.get('/', (req, res) => {
  let bigData = []
  dataArr.forEach( async (newData, i) => {
    await parser(`https://medium.com/feed/topic/${newData}`, (err, rss) => {
      if(err){
        console.log(err);
      } else {
        console.log(newData, 'DATA');
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
        debugger
        bigData.push(data)
      }
      if (bigData.length === dataArr.length) {
        res.send(bigData)
      }
    })
  })
})

module.exports = router;
