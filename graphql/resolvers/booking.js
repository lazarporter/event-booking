const { Booking, Event } = require('../../models');
const { transformEvent, transformBooking } = require('./shared');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated');
    }

    try {
      const bookings = await Booking.find();
      return bookings.map(transformBooking);
    } catch (err) {
      console.err(err);
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated');
    }

    const existingEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: req.userId,
      event: existingEvent,
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated');
    }

    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
