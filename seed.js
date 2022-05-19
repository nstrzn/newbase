"use strict";

const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb://127.0.0.1:27017/newbase_db",
  { useNewUrlParser: true }
);
mongoose.connection;

var contacts = [
  {
    name: "Katja",
    email: "test@katja.com",
    zipCode: 12459
  },
  {
    name: "Fatima",
    email: "fatima@test.com",
    zipCode: 22222
  },
  {
    name: "Test Test",
    email: "test@test.com",
    zipCode: 55555
  }
];

Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });

var commands = [];

contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email
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