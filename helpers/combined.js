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
      // if (metadata[i]) {
      //   metadata.forEach((meta) => {
      //     if (meta.guid === eachList.postID) {
      //       console.log(meta.guid);
      //       meta['postID'] = eachList.postID
      //     }
      //   })
      // }
      metadata.forEach((meta) => {
        if (meta.guid === eachList.postID) {
          meta['postID'] = eachList.postID
        }
      })
    })
    res.send(metadata)
  })
}

module.exports = {
  getCombined
}
