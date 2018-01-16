const request = require('supertest');
const app = require('../app');
const Article = require('../models/articleModel');
const Conjunction = require('../helpers/scrapping')
const socket = require('../graphql/index')

let obj = {
  userId : '1234456',
  times : 20,
  preferences : [
    {
      preferences: 'art'
    }
  ]
}

let result = {}

describe('TESTING CONJUNCTION', () => {
  test('Check Success Create Conjunction',async (done) => {
    expect(Conjunction.createConjuction(obj,socket)).toEqual(result);
    expect(res.statusCode).toEqual(200);
    done();
  })
});
