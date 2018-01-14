const {GraphQLObjectType, GraphQLList, GraphQLSchema} = require('graphql');
const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/userModel');
const Article = require('../models/articleModel');
const {userType, userInputType, mongoRespType} = require('./user');
const {articleType, articleInputType} = require('./article');
const {createConjuction} = require('../helpers/scrapping');

const query = new GraphQLObjectType({
  name : 'Query',
  fields : {
    users : {
      type : new GraphQLList(userType),
      resolve : async () => {
        return await User.find();
      }
    },
    user : {
      type : userType,
      args : {
        input: {
          name : 'userInput',
          type : userInputType
        }
      },
      resolve : async (root,args) => {
        return await User.findOne({
          _id : args.input._id
        });
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
      type : userType,
      args : {
        input: {
          name : 'userInput',
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
        return await User.findOne({
          validation : input.validation
        });
      }
    },
    updateUser : {
      type : mongoRespType,
      args : {
        input : {
          name : 'userInput',
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
        if(input.preferences){
          createConjuction({
            api : input.api,
            userId : input._id,
            times : input.times,
            preferences : input.preferences
          });
        }
        return update;
      }
    },
    deleteUser : {
      type : mongoRespType,
      args : {
        input : {
          name : 'userInput',
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
          name : 'userInput',
          type : articleInputType
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
