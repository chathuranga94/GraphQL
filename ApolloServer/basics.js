const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    book: Book
  }

  type Book {
    title: String,
    author: String
  }

`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    book: () => { return {title: 'Born a Crime', author: 'Trevor Noah'}}
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});
