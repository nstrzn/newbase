"use strict";

const Thema = require("../models/Thema");

exports.getAllThemes = (req, res, next) => {
  Thema.find({}).exec()
  .then((themes) => {
  res.render("forum", {
    themes: themes
  });
  })
.catch((error) => {
  console.log(error.message);
  return[];
})
.then(() => {
  console.log("promise complete");
});
};

exports.saveTheme = (req, res) => {
  let newThema = new Thema({
    title: req.body.title,
    description: req.body.description,
    entryDate: new Date(),
  });

  newThema.save()
   .catch(error => {
    if(error) res.send(error);
  });
}
