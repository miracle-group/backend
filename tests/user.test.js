const request = require('supertest');
const app = require('../app')

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
    });
    test('It should response the POST method', async () => {
        const post = await request(app).post('/users');
        expect(post.statusCode).toBe(200);
    });
    test('It should response the DELETE method', async () => {
        const remove = await request(app).delete('/users/:id');
        expect(remove.statusCode).toBe(200);
    });
    test('It should response the EDIT method', async () => {
        const edit = await request(app).delete('/users/:id');
        expect(edit.statusCode).toBe(200);
    });
})

describe('Test type data JSON', () => {
    // email
    test('It should data GET email must be String', async () => {
        const response = await request(app).get('/users')
        expect(typeof(response.email).toBe('object'))
    });

    //name
    test('It should data GET name must be String', async () => {
        const response = await request(app).get('/users')
        expect(typeof(response.name).toBeType('object'))
    });

    //times
    test('It should data POST times must be Number', async () => {
        const response = await request(app).post('/users')
        expect(typeof(response.times).toBeType('number'))
    });

    //preferences
    test('It should data GET times preferences must be array', async () => {
        const response = await request(app).post('/users')
        expect(typeof(response.preferences).toBeType('array'))
    });

    //history
    test('It should data GET times history must be array', async () => {
        const response = await request(app).post('/users')
        expect(typeof(response.history).toBeType('array'))
    });

    //test 0
    test('zero', () => {
      const z = 0;
      expect(z).not.toBeNull();
      expect(z).toBeDefined();
      expect(z).not.toBeUndefined();
      expect(z).not.toBeTruthy();
      expect(z).toBeFalsy();
    });

    // test input biasa
    test('input field times type ', async () => {
        const input = await 20
        expect(input).toEqual(20)
    })
})
