const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  description: { type: String, trim: true, required: true },
  completed: { type: Boolean, default: "false" },
  // setup relationship with User model
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Task;
