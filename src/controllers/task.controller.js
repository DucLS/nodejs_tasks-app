const Task = require("../models/task.model");

class TaskController {
  static async create(req, res) {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });

    try {
      await task.save();

      res.status(201).json(task);
    } catch (err) {
      res.status(400).json(err.errors);
    }
  }

  static async list(req, res) {
    try {
      const tasks = await Task.find({ owner: req.user._id });

      res.json(tasks);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async detail(req, res) {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!task) {
        res.status(404).json();
      }

      res.json(task);
    } catch (err) {
      res.status(404).json(err);
    }
  }

  static async update(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      res.status(400).json({ error: "Invalid updates" });
    }

    try {
      const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!task) {
        res.status(404).json();
      }

      updates.forEach((update) => (task[update] = req.body[update]));
      await task.save();

      res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!task) {
        return res.status(404).json();
      }

      res.send(task);
    } catch (err) {
      res.status(500).json({ err: "Something went wrong!" });
    }
  }
}

module.exports = TaskController;
