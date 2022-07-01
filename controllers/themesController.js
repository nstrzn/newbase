"use strict";

const Thema = require("../models/Thema"),
getThemeParams = body => {
  return {
    title: body.title,
    description: body.description,
    entryDate: new Date()
  };
};

module.exports = {
  index: (req, res, next) => {
    Thema.find()
      .then(themes => {
        res.locals.themes = themes;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("forum/index", {
      flashMessages: {
        success: "Loaded all themes!"
      }
    });
  },
  show: (req, res, next) => {
    let themeId = req.params.id;
    Thema.findById(themeId)
      .then(theme => {
        res.locals.theme = theme;
        next();
      })
      .catch(error => {
        console.log(`Error fetching theme by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("forum/show");
  },
  create: (req, res, next) => {
    let themeParams = getThemeParams(req.body);
    Thema.create(themeParams)
      .then(theme => {
        res.locals.redirect = "/forum";
        res.locals.theme = theme;
        next();
      })
      .catch(error => {
        console.log(`Error saving theme: ${error.message}`);
        next(error);
      });
  },

}
