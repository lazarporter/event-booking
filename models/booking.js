const mongoose = require('mongoose');
const SCHEMA_STRING_CONSTANTS = require('./constants');

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SCHEMA_STRING_CONSTANTS.Event,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SCHEMA_STRING_CONSTANTS.User,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
