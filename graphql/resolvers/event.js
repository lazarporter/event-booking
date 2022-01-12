const { Event, User } = require('../../models');
const { debugHardcodeUserId } = require('../../models/constants');
const { transformEvent } = require('./shared');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(transformEvent);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args) => {
    const { title, description, price, date } = args.eventInput;
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
      createdEvent = transformEvent(result);
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
};
