const bcryptjs = require('bcryptjs');
const { User, Event } = require('../../models');

const events = (eventIds) =>
  Event.find({ _id: { $in: eventIds } })
    .then((events) =>
      events.map((event) => ({
        ...event._doc,
        creator: user.bind(this, event.creator),
      }))
    )
    .catch((err) => {
      throw err;
    });

const user = (userId) =>
  User.findById(userId)
    .then((user) => ({
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents),
    }))
    .catch((err) => {
      throw err;
    });

module.exports = {
  events: () => {
    return Event.find()
      .then((result) =>
        result.map((event) => {
          const res = {
            ...event._doc,
            creator: user.bind(this, event._doc.creator),
          };
          return res;
        })
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
        createdEvent = {
          ...result._doc,
          creator: user.bind(this, result._doc.creator),
        };
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
};
