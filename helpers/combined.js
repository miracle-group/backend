const listArticles = require('./listArticles')
const rssScrape = require('./rssCrape')

const getCombined = async (req, res, next) => {
  Promise.all([rssScrape.getContent(), listArticles.getListMedium()]).then((data) => {
    let scrapeContent = data[0]
    let scrapeList = data[1]
    let metadataContent = []
    let metadata = []
    scrapeContent.forEach((eachCategoryLoop) => {
      eachCategoryLoop.forEach((eachContent) => {
        let obj = {
          guid: eachContent.guid,
          link: eachContent.link,
          createdAt: eachContent.createdAt,
          author: eachContent.author,
          title: eachContent.title,
          content: eachContent.content,
          categories: eachContent.categories,
          read_time: eachContent.read_time
        }
        metadataContent.push(obj)
      })
    })
    scrapeList.forEach((eachList, i) => {
      eachList.forEach((perList) => {
        // console.log(metadataContent.length);
        metadataContent.forEach((meta,i) => {
          if(i > 2) {
            if (meta.guid === perList.postID) {
              let objList = {
                postID: perList.postID,
                thumbnail: `http://${perList.photo}`,
                link: meta.link,
                createdAt: meta.createdAt,
                author: meta.author,
                title: meta.title,
                content: meta.content,
                categories: meta.categories,
                read_time: meta.times
              }
              metadata.push(objList)
            }
          }
        })
      })
    })
    req.metadata = metadata
    next()
  })
}

module.exports = {
  getCombined
}
