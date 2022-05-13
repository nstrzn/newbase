"use strict";

const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    Restaurant = require("./models/restaurants");
    

mongoose.connect( "mongodb://localhost:27017/newbase", {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
   });

   var restaurant1 = new Restaurant({
    name: "Victorias Tacos",
    art: "mexikanisch"
   });
   restaurant1.save((error, savedDocument) => {
    if (error) console.log(error);
    console.log(savedDocument);
   });
   
   //single step saving into database
   Restaurant.create(
    {
    name: "Victorias Tacos",
    art: "mexikanisch"
    },
    function (error, savedDocument) {
    if (error) console.log(error);
    console.log(savedDocument);
    }
   );

var myQuery = Restaurant.findOne({
    name: "umami"
    });
    //.where("bezirk", /Berg/);
   myQuery.exec((error, data) => {
    if (data) console.log(data.name)
    else console.log("nichts");
   });

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3001);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/forum", homeController.showForum);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);



app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
