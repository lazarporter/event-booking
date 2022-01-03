const bcryptjs = require('bcryptjs');
const { User, Event } = require('../../models');

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => ({
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: getUser.bind(this, event.creator),
    }));
  } catch (err) {
    throw err;
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => ({
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: getUser.bind(this, event._doc.creator),
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args) => {
    const { title, description, price, date } = args.eventInput;
    const debugHardcodeUserId = '61d33ee9677503527c997b11';
    const creatorUserId = debugHardcodeUserId;
    const event = new Event({
      title,
      description,
      price: +price,
      date: new Date(date),
      creator: creatorUserId,
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: getUser.bind(this, result._doc.creator),
      };
      const foundUser = await User.findById(creatorUserId);
      if (!foundUser) {
        throw new Error('Could not find user');
      }
      foundUser.createdEvents.push(event);
      await foundUser.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      const { email, password: passwordInput } = args.userInput;
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        throw new Error('User already exists.');
      }
      const hash = await bcryptjs.hash(passwordInput, 12);
      const user = new User({
        email,
        password: hash,
      });
      const userSaveResult = await user.save();
      const { password, ...savedUser } = userSaveResult._doc;
      return savedUser;
    } catch (err) {
      throw err;
    }
  },
};
