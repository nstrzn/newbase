"use strict";

const Thema = require("../models/Thema");

module.exports = {
getAllThemes: (req, res) => {
  Thema.find({})
    .exec()
    .then((themes) => {
      res.render("forum", {
        themes: themes,
      });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
},

showTheme: (req, res) => {
  let themeId = req.params.id;
  Thema.findById(themeId)
    .then((theme) => {
      res.render("showTheme", {theme: theme});
    })
    .catch((error) => {
      console.log(error.message);
      return -1;
    });
},

saveTheme: (req, res) => {
  let newThema = new Thema({
    title: req.body.title,
    description: req.body.description,
    entryDate: new Date(),
  });
  newThema
    .save()
    .then(() => {
      console.log(newThema);
    })
    .catch((error) => {
      res.send(error);
    });
},

};
