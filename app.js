const express = require('express');
const bodyParser = require('body-parser');
const expressgraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
app.use(bodyParser.json());

app.use(
  '/graphql',
  expressgraphql.graphqlHTTP({
    schema: buildSchema(`
        type RootQuery { 
            events: [String!]!
        }
        type RootMutation {
            createEvent(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return ['Sunrise Yoga', 'Nature Trail Picnic', 'Cooking'];
      },
      createEvent: (args) => {
        const { name: eventName } = args;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.listen(3000);
