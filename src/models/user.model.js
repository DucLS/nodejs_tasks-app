const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 3) {
        throw new Error("Name must be at least 3 characters long");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    },
  },
});

module.exports = User;
