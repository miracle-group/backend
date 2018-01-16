const request = require('supertest');
const app = require('../app');

describe('GET /someRandomString', () => {
  test('Error 404 handler should be invoked if endpoint doesn\'t exist', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        if (err) throw err;
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
});

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
