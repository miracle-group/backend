const router = require('express').Router()
const parser = require('parse-rss')
const url    = "https://medium.com/feed/topic/technology"
const readingTime = require('reading-time');

router.get('/', function(req, res) {
  parser(url, (err, rss) => {
    if(err){
      console.log(err);
    } else {
      let data = []
      rss.forEach((dataRss) => {
        let stats = readingTime(dataRss.description)
        console.log(stats);
        // Maniuplating Guid
        let guidSplitted = dataRss.guid.split('/')
        let guidId = guidSplitted[4]
        let obj = {
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
      res.send(data)
    }
  })
})

module.exports = router;
