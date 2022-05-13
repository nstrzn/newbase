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

exports.saveTheme = (req, res) => {
  let newThema = new Thema({
    title: req.body.title,
    description: req.body.description,
    entryDate: new Date(),
  });
  newThema.save((error, result) => {
    if(error) res.send(error);
  })
}
