"use strict";

const router = require("express").Router(),
themesController = require("../controllers/themesController");
router.get("/forum/:id/join", themesController.join, themesController.respondJSON);
router.get("/forum", themesController.index, themesController.respondJSON);
router.use(themesController.errorJSON);
module.exports = router;