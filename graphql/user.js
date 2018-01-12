const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

const userType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    _id: {type: GraphQLString},
    email: {type: GraphQLString},
    name: {type: GraphQLString},
    preferences: {type: new GraphQLList(GraphQLString)},
    validation: {type: GraphQLString},
    times: {type: GraphQLInt},
    history: {type: new GraphQLList(GraphQLString)}
  }
});

const mongoRespType = new GraphQLObjectType ({
  name: 'Mongo',
  fields: {
    n : {type: GraphQLInt},
    nModified : {type: GraphQLInt},
    ok : {type: GraphQLInt}
  }
});

// Input Type
const userInputType = new GraphQLInputObjectType ({
  name: 'UserInput',
  fields: {
    _id: {type: GraphQLString},
    email: {type: GraphQLString},
    name: {type: GraphQLString},
    times: {type: GraphQLInt},
    preferences: {type: new GraphQLList(GraphQLString)},
    validation: {type: GraphQLString},
    history: {type: new GraphQLList(GraphQLString)}
  }
});

module.exports = {
  userType,
  userInputType,
  mongoRespType
};
