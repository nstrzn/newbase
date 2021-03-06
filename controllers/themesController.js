"use strict";

const httpStatus = require("http-status-codes");
const User = require("../models/user");
const Thema = require("../models/Thema"),
  getThemeParams = (body) => {
    return {
      title: body.title,
      description: body.description,
      entryDate: new Date(),
    };
  };

module.exports = {
  index: (req, res, next) => {
    Thema.find()
      .then((themes) => {
        res.locals.themes = themes;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("forum/index", {
      flashMessages: {
        success: "Loaded all themes!",
      },
    });
  },
  show: (req, res, next) => {
    let themeId = req.params.id;
    Thema.findById(themeId)
      .then((theme) => {
        res.locals.theme = theme;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching theme by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("forum/show");
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  create: (req, res, next) => {
    let themeParams = getThemeParams(req.body);
    Thema.create(themeParams)
      .then((theme) => {
        res.locals.redirect = "/forum";
        res.locals.theme = theme;
        next();
      })
      .catch((error) => {
        console.log(`Error saving theme: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let themeId = req.params.id;
    Thema.findByIdAndRemove(themeId)
      .then(() => {
        res.locals.redirect = "/forum";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals,
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error.",
      };
    }
    res.json(errorObject);
  },
  join: (req, res, next) => {
    let themeId = req.params.id,
      currentUser = req.user;
    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          themes: themeId,
        },
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch((error) => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));
    }
  },
  filterUserThemes: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedThemes = res.locals.themes.map((theme) => {
        let userJoined = currentUser.themes.some((userTheme) => {
          return userTheme.equals(theme._id);
        });
        return Object.assign(theme.toObject(), { joined: userJoined });
      });
      res.locals.themes = mappedThemes;
      next();
    } else {
      next();
    }
  },
};
