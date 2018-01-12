const express    = require('express')
      logger     = require('morgan')
      bodyParser = require('body-parser')
      cors       = require('cors')
      index      = require('./routes/index')
      users      = require('./routes/users')
      rssScrape  = require('./routes/rssScrape')


const app = express()

// GraphQL
const graphqlHTTP = require('express-graphql')
let appSchema = require('./routes/graphql')
app.use('/graphql', graphqlHTTP(
  {
    schema: appSchema,
    graphiql: true
  }
))

// Mongoose Connect
var mongoose = require('mongoose')
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-lxcs3.mongodb.net:27017,cluster0-shard-00-01-lxcs3.mongodb.net:27017,cluster0-shard-00-02-lxcs3.mongodb.net:27017/mongoose_repod?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
  useMongoClient: true
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// app.use('/', index)
app.use('/users', users)
app.use('/rss_scrape', rssScrape)

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
  console.log(err)
  res.status(err.status || 500)
  res.send({
    error: err
  })
})

module.exports = app
