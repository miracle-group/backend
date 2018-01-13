const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} = require('graphql');

const article_user = new GraphQLObjectType({
  name: 'Article_User',
  fields: {
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    postId: { type: GraphQLString }
  }
});

// Input Type
const article_userInputType = new GraphQLInputObjectType({
  name: 'Article_User_Input',
  fields: {
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    postId: { type: GraphQLString }
  }
});

module.exports = {
  article_user,
  article_userInputType
};
