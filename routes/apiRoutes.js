"use strict";

const usersController = require("../controllers/usersController");
const router = require("express").Router(),
themesController = require("../controllers/themesController");

router.post("/login", usersController.apiAuthenticate);
router.use(usersController.verifyJWT);
router.get("/forum", themesController.index, themesController.filterUserThemes, themesController.respondJSON);
router.get("/forum/:id/join", themesController.join, themesController.respondJSON);
router.use(themesController.errorJSON);
module.exports = router;