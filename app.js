const express = require('express')
      path       = require('path')
      logger     = require('morgan')
      bodyParser = require('body-parser')
      User       = require('./models/userModel')
      index      = require('./routes/index')
      users      = require('./routes/users')
      mongoose   = require('mongoose')
      graphql    = require('express-graphql')
      ObjectId   = require('mongoose').Types.ObjectId
      
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql')
const app = express()

mongoose.connection.openUri('mongodb://hary:hary@cluster0-shard-00-00-dvvn1.mongodb.net:27017,cluster0-shard-00-01-dvvn1.mongodb.net:27017,cluster0-shard-00-02-dvvn1.mongodb.net:27017/repod?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err,db) => {
  if (err) {
    console.log('TIDAK TERHUBUNG KE DATABASE')
  } else {
    console.log('DATABASE TERHUBUNG!')
  }
})


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/', index)
app.use('/users', users)

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    preferences: { type: new GraphQLList(GraphQLString) },
    validation: { type: GraphQLString },
    times: { type: GraphQLInt },
    history: { type: new GraphQLList(GraphQLString) }
  })
})

const userInputType = new GraphQLInputObjectType ({
  name: 'UserInput',
  fields: () => ({
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    times: { type: GraphQLInt },
    preferences: { type: new GraphQLList(GraphQLString) },
    validation: { type: GraphQLString },
    history: { type: new GraphQLList(GraphQLString) }
  })
})

const userDeleteType = new GraphQLInputObjectType ({
  name: 'UserDelete',
  fields: () => ({
    _id: {
      type: GraphQLString
    }
  })
})

const userEditType = new GraphQLInputObjectType ({
  name: 'userEdit',
  fields: () => ({
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    times: { type: GraphQLInt },
    preferences: { type: new GraphQLList(GraphQLString) },
    validation: { type: GraphQLString },
    history: { type: new GraphQLList(GraphQLString) }
  })
})

const userQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: async () => {
        return await User.find()
      }
    }
  })
})


const userMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    Times: {
      type: new GraphQLList(userType),
      args: {
        input: {
          name: 'userInput',
          email: 'userInput',
          times: 'userInput',
          preferences: 'userInput',
          validation: 'userInput',
          history: 'userInput',
          type: userInputType
        }
      },
      resolve: async (root,args) => {
        const { input } = args
        await User.create(input)
        let userData = await User.find()
        return userData
      }
    },
    deleteTimes: {
      type: new GraphQLList(userType),
      args: {
        hapus: {
          name: 'userDelete',
          type: userDeleteType
        }
      },
      resolve: async(root,args) => {
        const { hapus } = args
        const id = hapus._id
        await User.remove({_id: id })
        let userData = User.find()
        return userData
      }
    },
    editTimes: {
      type: new GraphQLList(userType),
      args: {
        edit: {
          name: 'UserEdit',
          type: userEditType
        }
      },
      resolve: async (root,args) => {
        const { edit } = args
        const id = edit._id
        await User.update({_id: id}, {
          name: edit.name,
          email: edit.email,
          times: edit.times,
          preferences: edit.preferences,
          validation: edit.validation,
          history: edit.history,
        })
        let userData = await User.find()
        return userData
      }
    }
  })
})

const movieSchema = new GraphQLSchema({
  query: userQuery,
  mutation: userMutation
})

// config graphql
app.use('/graphql', graphql({
  schema: movieSchema,
  graphiql: true
}))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
