const tester = require('graphql-tester').tester;
const request = require('supertest');

describe('Test Articles',() => {
  const self = this;
  beforeAll(() => {
    self.test = tester({
      url: 'http://localhost:3001/graphql', contentType: 'application/json'
    });
  });
  // Create New Post
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
  it('Create New Post Should Return Array',async () => {
    await self.test(JSON.stringify({
      query: `mutation{addArticle(input:{
        title : "Judul",
        tags : ["Hello","World"],
        read_time : 10,
        preview : "Lorem Ipsum",
        content : "Lorem Ipsum"
      }){
        _id title tags read_time preview content
      }}`
    })).then(response => {
      expect(Array.isArray(response.data.addArticle)).toBe(true);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  it('Create New Post Should Return Length More than 0',async () => {
    await self.test(JSON.stringify({
      query: `mutation{addArticle(input:{
        title : "Judul",
        tags : ["Hello","World"],
        read_time : 10,
        preview : "Lorem Ipsum",
        content : "Lorem Ipsum"
      }){
        _id title tags read_time preview content
      }}`
    })).then(response => {
      expect(response.data.addArticle.length).toBeGreaterThan(0);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  // Read Post
  it('Read Article Should Status Code 200',async () => {
    await self.test(JSON.stringify({
      query: `query{article{
        _id title read_time preview content tags
      }}`
    })).then(response => {
      expect(response.status).toBe(200);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  it('Read Article Should Return Array',async () => {
    await self.test(JSON.stringify({
      query: `query{article{
        _id title read_time preview content tags
      }}`
    })).then(response => {
      expect(Array.isArray(response.data.article)).toBe(true);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
});
