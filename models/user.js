const mongoose = require('mongoose');
const SCHEMA_STRING_CONSTANTS = require('./constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: SCHEMA_STRING_CONSTANTS.Event,
    },
  ],
});

module.exports = mongoose.model(SCHEMA_STRING_CONSTANTS.User, userSchema);
