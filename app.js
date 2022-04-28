var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const homeController = require("./controllers/homeController");
const port = 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.post("/", homeController.logRequestPaths);

app.get("/", homeController.getHomePage);

app.post("/contact", (req, res) => {
    res.send("Contact information submitted");
});

app.get("/users/:id", homeController.sendReqParam);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
