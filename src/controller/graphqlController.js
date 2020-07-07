const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const InventDocument = require('../db/models/inventDocument');
const  graphqlDataService  = require('../service/graphqlDataService');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    documentOne(storeId: String! ): Document,
    document(storeId: String! ): [Document]
    documents: [Document],
  }
  type Mutation {
      createDocument(docRefId: String!,
        docType: String!,
        storeId: String!,
        isReservation: Boolean): Document,
      deleteDocument(docRefId: String!, storeId: String): DeleteDocuments,
      deleteByStore(storeId: String!): DeleteDocuments
  }
  input DocumentInput {
    docRefId: String!,
    docType: String!,
    storeId: String!
  }
  type DeleteDocuments {
    docRefId: String!,
    storeId: String!
  } 
  type Document {
    docRefId: String!,
    docType: String!,
    storeId: String!
  }
`);

const rootResolver = {
    documentOne: graphqlInput => graphqlDataService.findOne(graphqlInput),
    document: graphqlInput => graphqlDataService.find(graphqlInput),
    documents: InventDocument.find(),
    createDocument: graphqlInput => graphqlDataService.saveData(graphqlInput),
    deleteDocument: graphqlInput => graphqlDataService.deleteOne(graphqlInput),
    deleteByStore: graphqlInput => graphqlDataService.deleteByStore(graphqlInput),
};

const graphql = graphqlHTTP({
    schema,
    rootValue: rootResolver,
    graphiql: true, // this creates the interactive GraphQL API explorer with documentation.
});

module.exports = graphql;