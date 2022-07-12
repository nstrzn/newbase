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
  router = require("./routes/index"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  passport = require("passport"),
  layouts = require("express-ejs-layouts"),
  expressValidator = require("express-validator"),
  User = require("./models/user");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3001);
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(express.json());
app.use(expressValidator());

app.use(layouts);
app.use(express.static("public"));

app.use(cookieParser("newbasepassword"));
app.use(
  expressSession({
    secret: "newbasepassword",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/", router);

const server = app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
}),
io = require("socket.io")(server);
require("./controllers/chatController")(io);
