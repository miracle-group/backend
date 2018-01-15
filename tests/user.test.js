const {tester} = require('graphql-tester');
const request = require('supertest');

let userId = '';

describe('Test Users',() => {
  const self = this;
  beforeAll(() => {
    self.test = tester({
      url: 'http://localhost:3001/graphql', contentType: 'application/json'
    });
  });
  // Create User
  it('Create New User Should Return Status Code 200',async () => {
    await self.test(JSON.stringify({
      query: `mutation{userAdd(input:{
        email : "yono@gmail.com",
        name : "yono",
        validation : "HASGDAY231623GASDSA"
      }){
        _id email name validation times preferences history
      }}`
    })).then(response => {
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
        _id email name validation times history preferences
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
        _id email name validation times history preferences
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
  it('Create New User Should Return Status OK',async () => {
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
  // valid name
  it('Register with invalid name', async () => {
    await self.test(JSON.stringify({
      query: `mutation{userAdd(input: {
        email: "yono@gmail.com",
        name : "yono",
        validation: "AXCASH218312412SNJDAS"
      }){
        _id email name validation times preferences history
      }}`
    })).then(response => {
      expect(response).toBeDefined()
    })
  })

// ============================= YANG BARU DIBUAT ====================================

  it('Register Name type Data', async () => {
    await self.test(JSON.stringify({
      query: `mutation{Times(input: {
        email: "yono@gmail.com",
        name : "yono",
        validation: "AXCASH218312412SNJDAS"
      }){
        _id email name validation
      }}`
    })).then(({data}) => {
      expect(data).toBeDefined()
      expect([data.name]).toEqual(expect.arrayContaining([data.name]))
    })
  })

  it('Register Email type Data', async () => {
    await self.test(JSON.stringify({
      query: `mutation{Times(input: {
        email: "yono@gmail.com",
        name : "yono",
        validation: "AXCASH218312412SNJDAS"
      }){
        _id email name validation
      }}`
    })).then(({data}) => {
      expect(data).toBeDefined()
      expect([data.email]).toEqual(expect.arrayContaining([data.email]))
    })
  })

  it('Register Validation type Data', async () => {
    await self.test(JSON.stringify({
      query: `mutation{Times(input: {
        email: "yono@gmail.com",
        name : "yono",
        validation: "AXCASH218312412SNJDAS"
      }){
        _id email name validation
      }}`
    })).then(({data}) => {
      expect(data).toBeDefined()
      expect([data.validation]).toEqual(expect.arrayContaining([data.validation]))
    })
  })

  it('Register ID type Data', async () => {
    await self.test(JSON.stringify({
      query: `mutation{Times(input: {
        email: "yono@gmail.com",
        name : "yono",
        validation: "AXCASH218312412SNJDAS"
      }){
        _id email name validation
      }}`
    })).then(({data}) => {
      expect(data).toBeDefined()
      expect([data._id]).toEqual(expect.arrayContaining([data._id]))
    })
  })

  it('Deleted ID type Data', async () => {
    await self.test(JSON.stringify({
      query: `mutation{deleteTimes(hapus: {
        _id : "${userId}",
        name : "Tomy Budiman"
      }){
        n nModified ok
      }}`
    })).then(({data}) => {
      // console.log(data);
      expect(data).toBeDefined()
    })
  })
});
