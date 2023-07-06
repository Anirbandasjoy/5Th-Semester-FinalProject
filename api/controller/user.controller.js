const User = require("../models/user.models");
const express = require("express");
const app = express();
const passport = require("passport");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("../config/passport");
app.use(passport.initialize());

// user create controller

const createUser = async (req, res) => {
  try {
    const { name, email, password, image, phone } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const newUser = await User({
        name,
        email,
        password: hash,
        image,
      });
      await newUser
        .save()
        .then((user) => {
          res.status(201).json({
            message: "User is created Successfully",
            newUser,
          });
        })
        .catch((err) => {
          res.status(201).json(err.message);
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// user login controller logic
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User is not found" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
      image: user.image,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: "2d",
    });
    return res.status(200).json({
      message: "logged in seccessfully ",
      token: "Bearer " + token,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// get profile controller logic

// get profile controller logic

const getProfile = [
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    return res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        location: req.user.location,
        isAdmin: req.user.phone,
        isBanned: req.user.isBanned,
        image: req.user.image,
      },
    });
  },
];

// getAll user logic

const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) return res.status(400).json({ message: "user is not avilable" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createUser, getAllUser, loginUser, getProfile };
