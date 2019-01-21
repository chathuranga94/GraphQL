const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema -> SHAPE OF YOUR DATA?
const typeDefs = gql`
  # Comparable to GET in REST!
  type Query {
    Posts: [Post],
    authorById(id: String!): String #Author
  }

  # Comparable to POST in REST!
  type Mutation {
    addPost(title: String!, content: String!): [Post]
  }
  
  type Author {
    id: String
    firstName: String
    lastName: String
    country: String
    posts: [Post]
  }
  
  type Post {
    title: String
    content: String
  }
`;

// FETCH FROM REST OR SERVICE OR DATABASE!
let posts = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      content: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];

const authors = [
    { id: '100', firstName: 'AAA', lastName: 'BBB', country: 'UK', posts: posts},
    { id: '200', firstName: 'CCC', lastName: 'DDD', country: 'US', posts: posts},
    { id: '300', firstName: 'EEE', lastName: 'FFF', country: 'AU', posts: posts},
]
  
// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    Posts: () => posts,
    authorById: (obj, args, context, info) => {
        const x  = authors.find( author => author.id === args.id)
        return x.firstName + " " + x.lastName;
    }
  },
  Mutation: {
    addPost: (obj, args) => {
        posts.push({title: args.title, content: args.content});
        return posts;
    }
  }
};

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

 mutation {
   addPost("HEY", "HEY")
 }
 */