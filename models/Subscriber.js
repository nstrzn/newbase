"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var subscriberSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999
    },
    forum: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fourm"
      }
    ]
  },
  {
    timestamps: true
  }
);

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
