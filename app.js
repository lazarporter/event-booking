const express = require('express');
const bodyParser = require('body-parser');
const expressgraphql = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();
app.use(bodyParser.json());
app.use(isAuth);
app.use(
  '/graphql',
  expressgraphql.graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sb1so.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Starting server...');
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
