"use strict";

const res = require("express/lib/response");

var forum = [
  {
    title: "Eintrag 1",
    text: "Beispieltext"
  },
  {
    title: "Eintrag 2",
    text: "Beispieltext"
  },
  {
    title: "Eintrag 3",
    text: "Beispieltext"
  }
];

module.exports = {
  showForum: (req, res) => {
    res.render("forum", {
      forumBeitraege: forum
    });
  },
  showSignUp: (req, res) => {
    res.render("contact");
  },

  postedSignUpForm: (req, res) => {
    let paramsName = req.body.name;
    res.render("thanks", {name: paramsName});
  }
};



