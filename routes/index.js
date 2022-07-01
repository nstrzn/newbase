"use strict";

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  themeRoutes = require("./themeRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/forum", themeRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);
module.exports = router;
