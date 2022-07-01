"use strict";

const router = require("express").Router(),
  themesController = require("../controllers/themesController");
router.delete("/:id/delete", themesController.delete, themesController.redirectView);
router.get("/", themesController.index, themesController.indexView);
router.get("/:id", themesController.show, themesController.showView);
router.post("/", themesController.create, themesController.redirectView);
module.exports = router;
