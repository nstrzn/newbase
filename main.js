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
mongoose.Promise = global.Promise;

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  themesController = require("./controllers/themesController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
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

app.get("/forum", themesController.getAllThemes);
app.get("/forum/:id", themesController.showTheme);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.get("/users", usersController.index);

app.post("/subscribe", subscribersController.saveSubscriber);
app.post("/forum", themesController.saveTheme);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
