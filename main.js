"use strict";
const Thema = require("./models/Thema");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/newbase_db", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  themesController = require("./controllers/themesController"),
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3001);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
app.get("/forum", themesController.getAllThemes);

app.post("/forum", themesController.saveTheme);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
