"use strict"

const router = require("express").Router(),
themesController = require("../controllers/themesController");

router.get("/forum", themesController.getAllThemes, themesController.respondJSON);
router.use(themesController.errorJSON);

module.exports = router;
