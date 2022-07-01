"use strict";

const router = require("express").Router(),
  themesController = require("../controllers/themesController");
  router.get("/", themesController.index, themesController.indexView);
  router.get("/:id", themesController.show, themesController.showView);
  router.post("/", themesController.create);
module.exports = router;