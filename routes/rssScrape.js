const router = require('express').Router()
const parser = require('parse-rss')
const readingTime = require('reading-time');

let dataArr = ['javascript', 'technology']

router.get('/', (req, res) => {
  let terakhir = ''

  dataArr.forEach( async(newData, i) => {

    await parser(`https://medium.com/feed/topic/${newData}`, (err, rss) => {
      let bigData = []
      if(err){
        console.log(err);
      } else {
        // console.log(newData, 'DATA');
        let data =[]
        rss.forEach((dataRss) => {
          let stats = readingTime(dataRss.description)
          // Maniuplating Guid
          let guidSplitted = dataRss.guid.split('/')
          let guidId = guidSplitted[4]
          let obj = {
            newData: newData,
            // link: dataRss.link,
            // guid: guidId,
            // createdAt: dataRss.date,
            // author: dataRss.author,
            title: dataRss.title
            // content: dataRss.description,
            // categories: dataRss.categories,
            // read_time: stats.text
          }
          data.push(obj)
        })
        console.log(data);
        bigData.push(data)
        // bigData = data
        // res.send(data)
        console.log()
        debugger
      }
      debugger
        res.send(bigData)
    })

    terakhir = bigData
  })
  console.log(terakhir);
    // let url   = `https://medium.com/feed/topic/${newData}`
    // ambilData(){
    //
    // }
})

module.exports = router;
