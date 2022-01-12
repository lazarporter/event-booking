const { formatDate } = require('../../helpers/date');
const { Event, User } = require('../../models');

const transformEvent = (event) => ({
  ...event._doc,
  date: formatDate(event._doc.date),
  creator: getUser.bind(this, event.creator),
});

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    user: getUser.bind(this, booking._doc.user),
    event: getEvent.bind(this, booking._doc.event),
    createdAt: formatDate(booking._doc.createdAt),
    updatedAt: formatDate(booking._doc.updatedAt),
  };
};

const getEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(transformEvent);
  } catch (err) {
    throw err;
  }
};

const getEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: getEvents.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  transformEvent,
  transformBooking,
};
