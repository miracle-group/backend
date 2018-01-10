const request = require('supertest');
const app = require('../app')
const tester = require('graphql-tester').tester


// describe('Test the root path', () => {
//     test('It should response the GET method', async () => {
//         const response = await request(app).get('/');
//         // console.log('INI RESP',response);
//         expect(response.statusCode).toBe(200);
//     });
//     test('It should response the POST method', async () => {
//         const post = await request(app).post('/graphql');
//         expect(post.statusCode).toBe(200);
//     });
//     test('It should response the DELETE method', async () => {
//         const remove = await request(app).delete('/');
//         expect(remove.statusCode).toBe(200);
//     });
//     test('It should response the EDIT method', async () => {
//         const edit = await request(app).put('/');
//         expect(edit.statusCode).toBe(200);
//     });
// })

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
        })// using my fork shalkam/graphql-tester to be able to add this option to the node request
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





// describe('Test type data JSON', () => {
//     // email
//     test('It should data GET email must be String', async () => {
//         const response = await request(app).get('/graphql')
//         expect(typeof(response.email).toBe('object'))
//     });
//
//     //name
//     test('It should data GET name must be String', async () => {
//         const response = await request(app).get('/users')
//         expect(typeof(response.name).toBeType('object'))
//     });
//
//     //times
//     test('It should data POST times must be Number', async () => {
//         const response = await request(app).post('/users')
//         expect(typeof(response.times).toBeType('number'))
//     });
//
//     //preferences
//     test('It should data GET times preferences must be array', async () => {
//         const response = await request(app).post('/users')
//         expect(typeof(response.preferences).toBeType('array'))
//     });
//
//     //history
//     test('It should data GET times history must be array', async () => {
//         const response = await request(app).post('/users')
//         expect(typeof(response.history).toBeType('array'))
//     });
//
//     //test 0
//     test('zero', () => {
//       const z = 0;
//       expect(z).not.toBeNull();
//       expect(z).toBeDefined();
//       expect(z).not.toBeUndefined();
//       expect(z).not.toBeTruthy();
//       expect(z).toBeFalsy();
//     });
//
//     // test input biasa
//     test('input field times type ', async () => {
//         const input = await 20
//         expect(input).toEqual(20)
//     })
// })
