const express = require('express');
const bodyParser = require('body-parser');
const expressgraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const { User, Event, SCHEMA_STRING_CONSTANTS } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(
  '/graphql',
  expressgraphql.graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
          _id: ID!,
          email: String!
          password: String
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        input UserInput {
          email: String!
          password: String!
        }

        type RootQuery { 
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery  
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((result) =>
            result.map((event) => ({
              ...event._doc,
            }))
          )
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      createEvent: (args) => {
        const { title, description, price, date } = args.eventInput;
        const debugHardcodeUserId = '61d12b12c78cc68693d39950';
        const creatorUserId = debugHardcodeUserId;
        const event = new Event({
          title,
          description,
          price: +price,
          date: new Date(date),
          creator: creatorUserId,
        });
        let createdEvent;
        return event // TODO: use transaction
          .save()
          .then((result) => {
            createdEvent = result._doc;
            return User.findById(creatorUserId);
          })
          .then((foundUser) => {
            if (!foundUser) {
              throw new Error('Could not find user');
            }
            foundUser.createdEvents.push(event);
            return foundUser.save();
          })
          .then(() => createdEvent)
          .catch((err) => {
            console.log(err);
            throw err;
          });
        return event;
      },
      createUser: (args) => {
        const { email, password } = args.userInput;
        return User.findOne({ email })
          .then((foundUser) => {
            if (foundUser) {
              throw new Error('User already exists.');
            }

            return bcryptjs.hash(password, 12);
          })
          .then((hash) => {
            const user = new User({
              email,
              password: hash,
            });
            return user.save();
          })
          .then((result) => {
            const { password, ...rest } = result._doc;
            return rest;
          })
          .catch((err) => {
            throw err;
          });
      },
    },
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
