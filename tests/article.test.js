const tester = require('graphql-tester').tester;
const request = require('supertest');
const app = require('../app');
const Conjuction = require('../controllers/controlArticle');


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

describe('POST new Article', () => {
const self = this;
beforeAll(() => {
  self.test = tester({
    url: 'http://repod.ga:8000/graphql', contentType: 'application/json'
  });
});
it('Create New Post Should Return Status Code 200',async () => {
    await self.test(JSON.stringify({
      query: `mutation{addArticle(input:{
        title : "Judul",
        tags : ["Hello","World"],
        read_time : 10,
        content : "Lorem Ipsum"
      }){
        _id title tags read_time content
      }}`
    })).then(response => {
      expect(response.status).toBe(200);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });

  it('Read Article Should Status Code 200',async (done) => {
    await self.test(JSON.stringify({
      query: `query{article{
        _id title read_time preview content tags
      }}`
    })).then(response => {
      expect(response.status).toBe(200);
      done()
    }).catch(err => {
      expect(err).toBe(false);
    });
  });
})

describe('Update Read Status', () => {
  test('Check Update Read Status True', (done) => {
   request(app)
    .post(`/api/article/6b95fc36159d/true`)
    .end((err,res) => {
      expect(res.statusCode).toEqual(200)
      done()
    })
  });
})

describe('Update Read Status False', () => {
  test('Check Update Read Status False', (done) => {
   request(app)
    .post(`/api/article/6b95fc36159d/false`)
    .end((err,res) => {
      expect(res.statusCode).toEqual(200)
      done()
    })
  });
})

describe('Update Rating Status Fail', () => {
  test('Should return 404 if user doesnt exist', (done) => {
  request(app)
    .get('/api/article/6b95fc36159d/4')
    .end((err, res) => {
      expect(typeof res.body).toEqual('object');
      expect(res.statusCode).toEqual(404);
      done();
    });
  });
})

describe('Update Rating Article', () => {
  test('Rating Articles', (done) => {
   request(app)
    .post(`/api/article/6b95fc36159d/4`)
    .end((err,res) => {
      expect(res.statusCode).toEqual(200)
      done()
    })
  });
})

describe('Update Rating Article Fail', () => {
  test('Should return 404 if user doesnt exist', (done) => {
  request(app)
    .get('/api/article/hary/4')
    .end((err, res) => {
      expect(typeof res.body).toEqual('object');
      expect(res.statusCode).toEqual(404);
      done();
    });
  });
})
