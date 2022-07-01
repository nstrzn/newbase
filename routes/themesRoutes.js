"use strict"
const router = require("express").Router(),
themesController = require("../controllers/themesController");

router.get("/", themesController.getAllThemes, themesController.getAllThemesView);
router.get("/:id", themesController.showTheme);
router.post("/", themesController.saveTheme);

module.exports = router;