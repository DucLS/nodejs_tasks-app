const express = require("express");
const Task = require("../models/task.model");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json(err.errors);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json();
    }

    res.json(task);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const opts = { runValidators: true, new: true };
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, opts);

    if (!task) {
      res.status(404).json();
    }

    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json();
    }

    res.send(task);
  } catch (err) {
    res.status(500).json({ err: "Something went wrong!" });
  }
});

module.exports = router;
