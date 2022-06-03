"use strict";

const res = require("express/lib/response");

var forum = [
  {
    title: "Eintrag 1",
    text: "Beispieltext",
  },
  {
    title: "Eintrag 2",
    text: "Beispieltext",
  },
  {
    title: "Eintrag 3",
    text: "Beispieltext",
  },
];

var channels = [
  {
    title: "Web Development",
    description: "test",
  },
  {
    title: "Design",
    description: "test",
  },
];
module.exports = {
  showCourses: (req, res) => {
    res.render("courses", {
      channels: channels,
    });
  },
  showForum: (req, res) => {
    res.render("forum", {
      forumBeitraege: forum,
    });
  },
  showSignUp: (req, res) => {
    res.render("contact");
  },
  postedSignUpForm: (req, res) => {
    let paramsName = req.body.name;
    res.render("thanks", { name: paramsName });
  },
};
