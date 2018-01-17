const app = require('express')()
      path            = require('path')
      logger          = require('morgan')
      bodyParser      = require('body-parser')
      User            = require('./models/userModel')
      index           = require('./routes/index')
      mongoose        = require('mongoose')
      graphql         = require('express-graphql')
      ObjectId        = require('mongoose').Types.ObjectId
      cors            = require('cors')
const socket          = require('socket.io')();
const {GraphQLSchema} = require('graphql');

const {query, mutation} = require('./graphql')(socket);

mongoose.connect('mongodb://35.198.201.189:27017/repod',{
  useMongoClient : true
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.io = socket;

const appSchema = new GraphQLSchema({
  query : query,
  mutation : mutation
});

// API
app.get('/',(req,res) => {
  res.send('Server Ready');
});

//=> GraphQL
app.use('/graphql', graphql({
  schema: appSchema,
  graphiql: true
}));

//=> Express
const api = require('./routes');
app.use('/api',api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  console.log(err);
  res.status(err.status || 500)
  res.send(err)
});

module.exports = app
