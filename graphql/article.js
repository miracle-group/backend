const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

const articleType = new GraphQLObjectType({
  name: 'Article',
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)},
    read_time: {type: GraphQLInt},
    content: {type: GraphQLString}
  }
});

// Input Type
const articleInputType = new GraphQLInputObjectType ({
  name: 'ArticleInput',
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)},
    read_time: {type: GraphQLInt},
    content: {type: GraphQLString}
  }
});

module.exports = {
  articleType,
  articleInputType
};
