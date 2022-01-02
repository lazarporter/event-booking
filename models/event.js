const mongoose = require('mongoose');
const SCHEMA_STRING_CONSTANTS = require('./constants');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: SCHEMA_STRING_CONSTANTS.User,
  },
});

module.exports = mongoose.model(SCHEMA_STRING_CONSTANTS.Event, eventSchema);
