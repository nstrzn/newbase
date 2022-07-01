"use strict";

const Thema = require("../models/Thema"), 
httpStatus = require("http-status-codes"); 


exports.getAllThemes = (req, res, next) => {
  Thema.find({})
    .exec()
    .then((themes) => {
      res.locals.theme = themes,
      next(); 
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.getAllThemesView = (req, res) => {
  res.render("themes/forum", {
    themes: res.locals.theme
  });

};

exports.showTheme = (req, res) => {
  let themeId = req.params.id;
  Thema.findById(themeId)
    .then((theme) => {
      res.render("themes/showTheme", {theme: theme});
    })
    .catch((error) => {
      console.log(error.message);
      return -1;
    });
};

exports.saveTheme = (req, res) => {
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
};

exports.respondJSON = (req, res) => {
  res.json({
  status: httpStatus.OK,
  data: res.locals.theme
  });
  console.log("JSON loaded");
 }; 

 exports.errorJSON =  (error, req, res, next) => {
  let errorObject;
  if (error) {
  errorObject = {
 status: httpStatus.INTERNAL_SERVER_ERROR,
 message: error.message
  };
  } else {
  errorObject = {
 status: httpStatus.INTERNAL_SERVER_ERROR,
 message: "Unknown Error."
  };
  }
  res.json(errorObject);
 }; 


