const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

const outputUserPreferencesType = new GraphQLObjectType({
  name : 'OutputPreferences',
  fields : {
    name : {type : GraphQLString},
    value : {type : GraphQLInt}
  }
})

const userType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    _id: {type: GraphQLString},
    email: {type: GraphQLString},
    name: {type: GraphQLString},
    profileImage : {type: GraphQLString},
    preferences: {type: new GraphQLList(outputUserPreferencesType)},
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
const preferencesType = new GraphQLInputObjectType ({
  name : 'Preferences',
  fields : {
    name : {type : GraphQLString},
    value : {type : GraphQLInt}
  }
});

const userInputType = new GraphQLInputObjectType ({
  name: 'UserInput',
  fields: {
    api: {type: GraphQLString},
    _id: {type: GraphQLString},
    email: {type: GraphQLString},
    name: {type: GraphQLString},
    times: {type: GraphQLInt},
    profileImage : {type: GraphQLString},
    preferences: {type: new GraphQLList(preferencesType)},
    validation: {type: GraphQLString},
    history: {type: new GraphQLList(GraphQLString)}
  }
});

module.exports = {
  userType,
  userInputType,
  mongoRespType
};
