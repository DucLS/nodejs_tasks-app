const express = require("express");
const sharp = require("sharp");

const User = require("../models/user.model");
const router = new express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const UserController = require("../controllers/user.controller");

router.post("/users", UserController.create);

router.get("/users/me", auth, UserController.profile);

router.get("/users", UserController.list);

router.get("/users/:id", auth, UserController.detail);

router.patch("/users/me", auth, UserController.updateProfile);

router.delete("/users/:id", auth, UserController.delete);

router.post("/users/login", UserController.login);

router.post("/users/logout", auth, UserController.logout);

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  UserController.uploadAvatar,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, UserController.deleteAvatar);

router.get("/users/:id/avatar", UserController.getAvatar);

module.exports = router;
