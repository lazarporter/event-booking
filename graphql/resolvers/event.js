const { Event, User } = require('../../models');
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
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated');
    }

    const { title, description, price, date } = args.eventInput;
    const event = new Event({
      title,
      description,
      price: +price,
      date: new Date(date),
      creator: req.userId,
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const foundUser = await User.findById(req.userId);
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
