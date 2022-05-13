"use strict";

const mongoose = require("mongoose"),
  restaurantSchema = mongoose.Schema({
    name: String,
    art: String,
    bezirk: String
  });

module.exports = mongoose.model("Restaurant", restaurantSchema);