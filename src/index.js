const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

require("./db/mongoose");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");
const auth = require("./middleware/auth");

dotenv.config({ path: __dirname + "/./../.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

// Use express.json() to parse incoming requests with JSON payloads
app.use(express.json());

// Setup route API User
app.use(userRouter);

// Setup route API Task
app.use(taskRouter);

app.get("/", (req, res) => res.send("Hello Sun!"));

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
