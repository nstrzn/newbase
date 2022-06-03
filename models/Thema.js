"use strict";

const mongoose = require("mongoose"),
themaSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
description: String,
entryDate: Date,
});

module.exports = mongoose.model("Thema", themaSchema);

