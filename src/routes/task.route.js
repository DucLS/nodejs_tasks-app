const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const TaskController = require("../controllers/task.controller");

router.post("/tasks", auth, TaskController.create);

router.get("/tasks", auth, TaskController.list);

router.get("/tasks/:id", auth, TaskController.detail);

router.patch("/tasks/:id", auth, TaskController.update);

router.delete("/tasks/:id", auth, TaskController.delete);

module.exports = router;
