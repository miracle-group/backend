const {tester} = require('graphql-tester');
const request = require('supertest');
const app = require('../app');

let userId = '';

describe('Test Users',() => {
  const self = this;
  beforeAll(() => {
    self.test = tester({
      url: 'https://repod.ga/graphql', contentType: 'application/json'
    });
  });
  // Create User
  it('Create New User Should Return Status Code 200',async () => {
    await self.test(JSON.stringify({
      query: `mutation{userAdd(input:{
        email : "tomy@gmail.com",
        name : "tomy"
      }){
        _id email name validation times preferences{name value} history
      }}`
    })).then(response => {
      console.log(response.data.userAdd._id);
      userId = response.data.userAdd._id;
      expect(response.status).toBe(200);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  // Read Users
  it('Read Users Should Return Status Code 200',async () => {
    await self.test(JSON.stringify({
      query: `query{users {
        _id email name validation times history preferences{name value}
      }}`
    })).then(response => {
      expect(response.status).toBe(200);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  it('Read Users Should Return Array',async () => {
    await self.test(JSON.stringify({
      query: `query{users{
        _id email name validation times history preferences{name value}
      }}`
    })).then(response => {
      expect(Array.isArray(response.data.users)).toBe(true);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  // Update User
  it('Find User Based on ObjectId',async () => {
    await self.test(JSON.stringify({
      query : `mutation{updateUser(input:{
        _id : "${userId}"
      }){
        n nModified ok
      }}`
    })).then(response => {
      expect(response.data.updateUser.n).toBe(1);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  it('Update User Should Work Correctly',async () => {
    await self.test(JSON.stringify({
      query : `mutation{updateUser(input:{
        _id : "${userId}",
        name : "Tomy Budiman"
      }){
        n nModified ok
      }}`
    })).then(response => {
      expect(response.data.updateUser.nModified).toBe(1);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  // Delete User
  it('Delete New User Should Return Status OK',async () => {
    await self.test(JSON.stringify({
      query: `mutation{deleteUser(input:{
        _id : "${userId}"
      }){
        n nModified ok
      }}`
    })).then(response => {
      expect(response.data.deleteUser.ok).toBe(1);
    }).catch(err => {
      expect(err).toBe(null);
    });
  });
  // Type Data Users
  it('Validation Register Name',async () => {
    await self.test(JSON.stringify({
      query: `mutation{userAdd(input:{
        email : "yono@gmail.com",
        name : "yono",
        validation : "HASGDAY231623GASDSA"
      }){
        _id email name validation times preferences{name value} history
      }}`
    })).then(response => {
      expect(response.data.userAdd.name).toBe('yono')
    })
  })
  // validation email
  it('Check Validation Register Email',async () => {
    await self.test(JSON.stringify({
      query: `mutation{userAdd(input:{
        email : "yono@gmail.com",
        name : "yono",
        validation : "HASGDAY231623GASDSA"
      }){
        _id email name validation times preferences{name value} history
      }}`
    })).then(response => {
      expect(response.data.userAdd.email).toBe('yono@gmail.com')
    })
  })

  it('Check Validation Token',async () => {
    await self.test(JSON.stringify({
      query: `mutation{userAdd(input:{
        email : "yono@gmail.com",
        name : "yono",
        validation : "HASGDAY231623GASDSA"
      }){
        _id email name validation times preferences{name value} history
      }}`
    })).then(response => {
      expect(response.data.userAdd.validation).toBe('HASGDAY231623GASDSA')
    })
  })

  it('Check Default Times Register',async () => {
    await self.test(JSON.stringify({
      query: `mutation{userAdd(input:{
        email : "yono@gmail.com",
        name : "yono"
      }){
        _id email name validation times preferences{name value} history
      }}`
    })).then(response => {
      expect(response.data.userAdd.times).toBe(0)
    })
  })
});
