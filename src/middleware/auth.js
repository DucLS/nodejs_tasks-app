const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "ducls");

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ Msg: "Not authenticated" });
  }
};

module.exports = auth;
