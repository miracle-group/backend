const app = require('express')();
const logger = require('morgan');
const graphQlHttp = require('express-graphql');
const {GraphQLSchema} = require('graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const {query, mutation} = require('./graphql');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text({type: 'application/json'}));

mongoose.connect('mongodb://hary:hary@cluster0-shard-00-00-dvvn1.mongodb.net:27017,cluster0-shard-00-01-dvvn1.mongodb.net:27017,cluster0-shard-00-02-dvvn1.mongodb.net:27017/repod?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',{
  useMongoClient : true
});

app.get('/',(req,res) => {
  res.send('Server worked!');
});

const appSchema = new GraphQLSchema({
  query : query,
  mutation : mutation
});

app.use('/graphql',graphQlHttp({
  schema : appSchema,
  graphiql : true
}));

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
  res.status(err.status || 500);
  res.send({
    error: err
  });
});

module.exports = app
