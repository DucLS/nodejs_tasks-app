const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/user.model");

dotenv.config({ path: __dirname + "/./../../.env" });

mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {
    user: "root",
    pass: "Aa@123456",
    dbName: "task-manager",
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });


const user = new User({ name: "Ducls", age: 18 });

user.save().then((user) => {
  console.log(user);
});
