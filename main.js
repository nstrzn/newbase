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
  router = express.Router(),
  methodOverride = require("method-override"),
  errorController = require("./controllers/errorController"),
  themesController = require("./controllers/themesController"),
  subscribersController = require("./controllers/subscribersController.js"),
  usersController = require("./controllers/usersController.js"),
  layouts = require("express-ejs-layouts");


const expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash");
  router.use(cookieParser("secret_passcode"));
  router.use(expressSession({
  secret: "secret_passcode",
  cookie: {
  maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
  }));
  router.use(connectFlash());

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3001);
app.use(
  express.urlencoded({
    extended: false,
  })
);

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(express.json());
router.use(layouts);
router.use(express.static("public"));

router.get("/", (req, res) => {
  res.render("index");
});
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
  });
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate,
  usersController.redirectView);
router.get("/forum", themesController.getAllThemes);
router.get("/forum/:id", themesController.showTheme);
//router.get("/subscribers", subscribersController.getAllSubscribers);
//router.get("/contact", subscribersController.getSubscriptionPage);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);
//router.post("/subscribe", subscribersController.saveSubscriber);
router.post("/forum", themesController.saveTheme);


router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
