const express = require("express");
const createHttpError = require("http-errors");
const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

// This route is used to register a user
userRouter.post("/register", async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return next(createHttpError.BadRequest("Missing required fields"));
    }
    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      return next(createHttpError.Conflict("User already exists"));
    } else {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          throw createHttpError.BadRequest("Something went wrong");
        } else {
          const userData = new UserModel({
            name,
            email,
            password: hash,
          });

          await userData.save();
          res.send("User Registered");
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

// This route is used to login the user
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(createHttpError.NotFound("Missing required fields"));
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw createHttpError.Unauthorized("You have to register first");
    } else {
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          throw createHttpError.Unauthorized("Invalid password");
        } else {
          const token = jwt.sign({ userId: user._id }, "ALPHA");
          res.json({
            message: "User Login Success",
            access_token: token,
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
