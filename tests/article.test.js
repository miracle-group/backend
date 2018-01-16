const tester = require('graphql-tester').tester;
const request = require('supertest');
const app = require('../app');



describe('GET /api/category/all', () => {
  test('Should return 200 if successful', (done) => {
    request(app)
      .get(`/api/category/all`)
      .end((err, res) => {
        if (err) throw err;
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
});
//
describe('GET /api/category/:category', () => {
  test('Should return 200 if successful', (done) => {
    request(app)
      .get(`/api/category/:category`)
      .end((err, res) => {
        if (err) throw err;
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
})
//
describe('GET /api/article/all/:userid', () => {
  test('Should return 200 if successful', (done) => {
    request(app)
      .get(`/api/article/all/5a5d6f25a4eec63b37b7b70c`)
      .end((err, res) => {
        if (err) throw err;
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
  })

})
