const User = require("../models/user.model");

class UserController {
  static async list(_, res) {
    try {
      const users = await User.find({});

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    const user = new User(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();

      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json(err.errors);
    }
  }

  static async detail(req, res) {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(404).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json();
      }

      res.send(user);
    } catch (err) {
      res.status(500).json({ err: "Something went wrong!" });
    }
  }

  static profile(req, res) {
    res.json(req.user);
  }

  static async updateProfile(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    try {
      updates.forEach((update) => {
        req.user[update] = req.body[update];
      });

      await req.user.save();

      res.json(req.user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();

      res.json({ user: user.getPublicProfile(), token });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  static async logout(req, res) {
    try {
      const { user, token: reqToken } = req;

      user.tokens = user.tokens.filter((token) => token.token !== reqToken);
      await user.save();

      res.json({ Msg: "Logout" });
    } catch (err) {
      res.status(500).json({ Msg: "Logout fail" });
    }
  }
}

module.exports = UserController;
