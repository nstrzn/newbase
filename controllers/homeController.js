"use strict";

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

exports.showForum = (req, res) => {
  res.render("forum", {
    forumBeitraege: forum
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};