const mongoose = require("mongoose"),
  channelSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: [],
  });
module.exports = mongoose.model("Channel", channelSchema);
