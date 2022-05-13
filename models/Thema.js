const mongoose = require("mongoose"),
themaSchema = mongoose.Schema({
title: String,
description: String,
entryDate: Date
});
module.exports = mongoose.model("Thema", themaSchema);