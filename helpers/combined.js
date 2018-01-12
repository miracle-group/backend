const listArticles = require('./listArticles')
const rssScrape = require('./rssCrape')

const getCombined = (req, res) => {
  Promise.all([rssScrape.getContent(), listArticles.getListMedium()]).then((data) => {
    let scrapeContent = data[0]
    let scrapeList = data[1]
    let metadata = []
    scrapeContent.forEach((eachCategoryLoop) => {
      eachCategoryLoop.forEach((eachContent) => {
        let obj = {
          guid: eachContent.guid
        }
        metadata.push(obj)
      })
    })
    scrapeList.forEach((eachList, i) => {
      if (metadata[i]) {
        if (metadata[i].guid == eachList.postID) {
          console.log('masuk sini');
          metadata[i]['postID'] = eachList.postID
        }
      }
    })
    res.send(metadata)
  })
}

module.exports = {
  getCombined
}
