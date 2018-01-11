const article = require('../controllers/articleController')

// GraphQL confiq
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} = require('graphql')

// GraphQL article schema
const ArticleType = new GraphQLObjectType (
  {
    name: 'Article',
    fields: {
      _id: {type: GraphQLString},
      title: {type: GraphQLString},
      tags: {type: new GraphQLList(GraphQLString)},
      read_time: {type: GraphQLInt},
      content: {type: GraphQLString},
      isRead: {type: GraphQLBoolean}
    }
  }
)

// GraphQL article input schema
const InputArticleType = new GraphQLInputObjectType (
  {
    name: 'ArticleInput',
    fields: {
      _id: {type: GraphQLString},
      title: {type: GraphQLString},
      tags: {type: GraphQLString},
      read_time: {type: GraphQLInt},
      content: {type: GraphQLString},
      isRead: {type: GraphQLBoolean}
    }
  }
)

// GraphQL "GET" method
const AppQuery = new GraphQLObjectType (
  {
    name: 'articleQuery',
    fields: {
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () => article.findAllArticles().then((dataArticles) => {
          return dataArticles
        })
      }
    }
  }
)

// GraphQL "POST" method
const AppMutation = new GraphQLObjectType (
  {
    name: 'appMutation',
    fields: {
      addArticle: {
        type: new GraphQLList (ArticleType),
        args: {
          articleParam: {
            name: 'articleParam',
            type: InputArticleType
          }
        },
        resolve: async (root, args) => {
          const { articleParam } = args
          await article.addArticle(articleParam)
          return await article.findAllArticles().then((dataArticles) => {
            return dataArticles
          })
        }
      }
    }
  }
)

const appSchema = new GraphQLSchema(
  {
    query: AppQuery,
    mutation: AppMutation
  }
)

module.exports = appSchema
