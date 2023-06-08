const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./task.model");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: async function (value) {
          if (!this.isModified("email")) {
            return;
          }

          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
          }

          const user = await this.constructor.findOne({ email: value });

          if (user) {
            throw new Error("Email is already in use");
          }
        },
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

// Setup foreign key
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login!");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id, email: user.email }, "ducls");

  user.tokens = user.tokens.concat({ token: token });
  await user.save();

  return token;
};

userSchema.methods.getPublicProfile = function () {
  const { _id, name, age, email } = this;

  return {
    _id,
    name,
    age,
    email,
  };
};

// Hash password before save
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  Task.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
