const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema -> SHAPE OF YOUR DATA?
const typeDefs = gql`
  # For all GraphQL 'Query'!
  type Query {
    Posts: [Post],
  }

  type Mutation {
    addPost(title: String!, content: String!): [Post]
  }
  
  type Post {
    title: String
    content: String
  }
`;

const resolvers = {
  Query: {
    Posts: () => posts,
  },
  Mutation: {
    addPost: (obj, args) => {
        posts.push({title: args.title, content: args.content});
        return posts;
    }
  }
};

let posts = [
    {   title: 'Harry Potter',  content: 'J.K. Rowling',},
    {   title: 'Jurassic Park', content: 'Michael Crichton',},
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});

/*
    {
        human(id: "1000") {
            name
            height(unit: FOOT)
        }
    }
*/

/**
 const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      course: {
        type: ...
        resolve(obj, args, context, info) {
          console.log(args); // { id: 1 }
        }
      }
    }
  });
 });
 */

 /* 
 query {
  authorById(id:"200"),
  Posts {
    title
    content
  }
 }
 */