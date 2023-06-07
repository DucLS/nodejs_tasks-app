const express = require("express");

const router = new express.Router();
const User = require("../models/user.model");
const auth = require("../middleware/auth");
const UserController = require("../controllers/user.controller");

router.post("/users", UserController.create);

router.get("/users/me", auth, UserController.profile);

router.get("/users", UserController.list);

router.get("/users/:id", auth, UserController.detail);

router.patch("/users/me", auth, UserController.updateProfile);

router.delete("/users/:id", auth, UserController.delete);

router.post("/users/login", UserController.login);

router.post("/users/logout", auth, UserController.logout);

module.exports = router;
