"use strict";

const Thema = require("../models/Thema");

exports.getAllThemes = (req, res, next) => {
  Thema.find({}, (error, themes) => {
    if (error) next(error);
    req.data = themes;
    console.log(themes);
    res.render("forum", { themes: req.data });
    next();
  });
};
