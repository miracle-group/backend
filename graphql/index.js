const {GraphQLObjectType, GraphQLList, GraphQLSchema} = require('graphql');
const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/userModel');
const Article = require('../models/articleModel');
const {userType, userInputType, mongoRespType} = require('./user');
const {articleType, articleInputType} = require('./article');

const query = new GraphQLObjectType({
  name : 'Query',
  fields : {
    users : {
      type : new GraphQLList(userType),
      resolve : async () => {
        return await User.find();
      }
    },
    article : {
      type : new GraphQLList(articleType),
      resolve : async () => {
        return await Article.find();
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name : 'Mutation',
  fields : {
    userAdd : {
      type : new GraphQLList(userType),
      args : {
        input: {
          name : 'userInput',
          email : 'userInput',
          times : 'userInput',
          preferences : 'userInput',
          validation : 'userInput',
          history : 'userInput',
          type : userInputType
        }
      },
      resolve: async (root,args) => {
        const {input} = args;
        const checkUser = await User.findOne({
          validation : input.validation
        });
        if(!checkUser){
          await User.create(input);
        }
        return await User.find();
      }
    },
    updateUser : {
      type : mongoRespType,
      args : {
        input : {
          _id : 'userInput',
          name : 'userInput',
          email : 'userInput',
          times : 'userInput',
          history: 'userInput',
          preferences : 'userInput',
          type : userInputType
        }
      },
      resolve : async (root,args) => {
        const {input} = args;
        const user = await User.findOne({_id : ObjectId(input._id)});
        const update = await User.updateOne({
          _id : ObjectId(input._id)
        },{
          name: input.name ? input.name : user.name,
          email: input.email ? input.email : user.email,
          times: input.times ? input.times : user.times,
          history: input.history ? input.history : user.history,
          preferences: input.preferences ? input.preferences : user.preferences,
        });
        return update;
      }
    },
    deleteUser : {
      type : mongoRespType,
      args : {
        input : {
          _id : 'userInput',
          type : userInputType
        }
      },
      resolve : async (root,args) => {
        const {input} = args;
        const remove = await User.deleteOne({
          _id : ObjectId(input._id)
        });
        return remove.result;
      }
    },
    addArticle : {
      type : new GraphQLList(articleType),
      args : {
        input : {
          title: 'userInput',
          tags: 'userInput',
          read_time: 'userInput',
          preview: 'userInput',
          content: 'userInput',
          type: articleInputType
        }
      },
      resolve : async (root,args) => {
        const {input} = args;
        await Article.create(input);
        return await Article.find()
      }
    }
  }
});

module.exports = {
  query,
  mutation
};
