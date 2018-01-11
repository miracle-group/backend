const request = require('supertest');
const app = require('../app')
const tester = require('graphql-tester').tester

describe('Test the articles path', () => {
  const self = this
    beforeAll(() => {
      self.test = tester({
        url: 'http://localhost:3001/graphql', contentType: 'application/json'
      })
    })

    // Get 200 response
    it ('should get 200 response', async () => {
      await self.test(
        JSON.stringify(
          {
            query: `{ articles { _id title tags read_time content isRead } }`
          }
        )
      )
      .then((res) => {
        expect(res.status).toBe(200)
      })
      .catch((err) => {
        expect(err).toBe(null)
      })
    })

    // Get _id as a string
    it ('should get _id as a string', async () => {
      await self.test(
        JSON.stringify(
          {
            query: `{ articles { _id } }`
          }
        )
      )
      .then((res) => {
        res.data.articles.forEach((data) => {
          expect(typeof(data._id)).toBe('string')
        })
      })
      .catch((err) => {
        expect(err).toBe(null)
      })
    })

    // Post 200 response
    it ('should post 200 response', async () => {
      await self.test(
        JSON.stringify(
          {
            query: `mutation { addArticle ( articleParam: { title: "berita acara", tags: "berita baru", read_time: 5, content: "lorem ipsum bla bla bla blabla bla", isRead: false } ) { _id title tags read_time content isRead } }`
          }
        )
      )
      .then((res) => {
        expect(res.status).toBe(200)
      })
      .catch((err) => {
        expect(err).toBe(null)
      })
    })

    // Post title as a string
    it ('should post title as string', async () => {
      await self.test(
        JSON.stringify(
          {
            query: `mutation { addArticle ( articleParam: { title: "berita acara", tags: "berita baru", read_time: 5, content: "lorem ipsum bla bla bla blabla bla", isRead: false } ) { _id title tags read_time content isRead } }`
          }
        )
      )
      .then((res) => {
        res.data.addArticle.forEach((data) => {
          expect(typeof(data.title)).toBe('string')
        })
      })
      .catch((err) => {
        expect(err).toBe(null)
      })
    })

})
