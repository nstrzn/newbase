"use strict";

const router = require("express").Router(), 
usersRoutes = require("./usersRoutes"),
subscribersRoutes = require("./subscribersRoutes"),
themesRoutes = require("./themesRoutes"),
errorRoutes = require("./errorRoutes"),
homeRoutes = require("./homeRoutes");

router.use("/users", usersRoutes);
router.use("/subscribers", subscribersRoutes);
router.use("/forum", themesRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router; 