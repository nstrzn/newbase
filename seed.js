"use strict"

const mongoose = require("mongoose"),
  Thema = require("./models/Thema");

mongoose.connect(
  "mongodb://localhost:27017/newbase_db",
  { useNewUrlParser: true }
);
mongoose.connection;

var themes = [
  {
    title: "Restaurants",
    description: "asiatisch",
    entryDate: new Date()
  },
  {
    title: "Clubs",
    description: "Friedrichshain",
    entryDate: new Date()
  },
  {
    title: "Bars",
    description: "P-Berg",
    entryDate: new Date()
  }
];

Thema.deleteMany()
  .exec()
  .then(() => {
    console.log("Forum data is empty!");
  });

var commands = [];

themes.forEach(t => {
  commands.push(
    Thema.create({
      title: t.title,
      description: t.description
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });