const express = require("express");
const router = new express.Router();
const User = require("../models/user.model");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err.errors);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const opts = { runValidators: true, new: true };
    const user = await User.findByIdAndUpdate(_id, req.body, opts);

    if (!user) {
      res.status(404).json();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    res.send(user);
  } catch (err) {
    res.status(500).json({ err: "Something went wrong!" });
  }
});

module.exports = router;
