"use strict";
const mongoose = require("mongoose");
const Subscriber = require("./models/Subscriber"),
  Channel = require("./models/Channel");

var testChannel, testSubscriber;

mongoose.connect("mongodb://127.0.0.1:27017/newbase_db", {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

Subscriber.remove({})
  .then((items) => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Channel.remove({});
  })
  .then((items) => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Subscriber.create({
      name: "Jon",
      email: "jon@jonwexler.com",
      zipCode: "12345",
    });
  })
  .then((subscriber) => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({
      name: "Jon",
    });
  })
  .then((subscriber) => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Channel.create({
      title: "Web Development",
      description: "Channel for Web Developers",
      items: [""],
    });
  })
  .then((chan) => {
    testChannel = chan;
    console.log(`Created course: ${chan.title}`);
  })
  .then(() => {
    testSubscriber.channels.push(testChannel);
    testSubscriber.save();
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, "channels");
  })
  .then((subscriber) => console.log(subscriber))
  .then(() => {
    return Subscriber.find({
      channels: mongoose.Types.ObjectId(testChannel._id),
    });
  })
  .then((subscriber) => console.log(subscriber));
