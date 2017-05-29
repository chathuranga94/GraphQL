import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

const myGraphQLSchema =   ` type Query {
                              testString: String
                            }
                            
                            schema {
                               query: Query
                            }
                          `;

const PORT = 3000;
var app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

app.use('/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log(`GraphQL Server started on localhost:${PORT}/graphql`));