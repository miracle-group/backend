const {GraphQLObjectType, GraphQLList, GraphQLSchema} = require('graphql');
const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/userModel');
const Article = require('../models/articleModel');
const Conjuction = require('../models/conjuctionModel');
const {userType, userInputType, mongoRespType} = require('./user');
const {articleType, articleInputType} = require('./article');
const {createConjuction} = require('../helpers/scrapping');

let counter = 0;

module.exports = (socket) => {
  socket.on('connection',(io) => {
    socket.io=io;
    socket.clientId=io.id
  });
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
          const userPreferences = user.preferences.map(category => {
            return category.name;
          });
          const deleted = userPreferences.filter(value => {
            return inputPreferences.indexOf(value) == -1;
          });
          if(input.preferences && input.preferences.length > 0){
            const inputPreferences = input.preferences.map(category => {
              return category.name;
            });
            createConjuction({
              userId : input._id,
              times : input.times,
              preferences : inputPreferences,
              deleted : deleted
            },socket);
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
          await User.deleteOne({
            _id : ObjectId(input._id)
          });
          const remove = await Conjuction.deleteMany({
            userId : ObjectId(input._id)
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
  return{
    query,
    mutation
  }
};
