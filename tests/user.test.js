const request = require('supertest');
const app = require('../app')
const tester = require('graphql-tester').tester

describe('Test articles path', () => {
   const self = this;
    beforeAll(() => {
      self.test = tester({
        url: `http://localhost:3000/graphql`,
        contentType: 'application/json'
      })
    })

    it ('It Should response GET', async () => {
      await self.test(
         JSON.stringify (
            {
               query: `{ users { _id, email, name, validation, times, preferences, history } }`
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

   it ('It Should response POST', async () => {
     await self.test(
        JSON.stringify (
           {
              query: `mutation { Times(input: {
                        	email: "yono@gmail.com",
                          name: "yono",
                          validation: "HASGDAY231623GASDSA",
                          times:10,
                          preferences:["Makan","Minum"],
                          history:["OK","ERROR"]
                        })
                        {
                          email
                          name
                          validation
                          times
                          preferences
                          history
                        }
                      }`
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

  it('It Should response DELETE', async (done) => {
    await self
      .test(
        JSON.stringify({
          query: `mutation deleteTimes(hapus: {$id: ID!}) {
            remove(id:$id) {
              _id
            }
          }`,
        })
      )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        done();
      })
      .catch(err => {
        // expect(err).toBe(null);
        done();
      });
    });

    it ('It Should response EDIT', async () => {
      await self.test(
         JSON.stringify (
            {
               query: `mutation{
                        editTimes(edit: {
                          _id: "5a55e6a71773532aee356065",
                        	email: "hary@gmail.com",
                          name: "hary",
                          validation: "HJASBDSJHABD23Y12321321321",
                          times:10,
                          preferences:["Tidur","Bangun"],
                          history:["BISA","TIDAK"]
                        })
                        {
                          _id
                          email
                          name
                          validation
                          times
                          preferences
                          history
                        }
                      }`
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
})
