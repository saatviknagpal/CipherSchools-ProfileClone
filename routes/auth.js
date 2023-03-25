const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (!emailExist) {
    return res.status(401).json({
      status: "fail",
      error: "emailError",
      message: "Email is not registered, Sign Up first",
      isLoggedIn: false,
    });
  }
  try {
    const auth = await bcrypt.compare(password, emailExist.password);
    if (auth) {
      const token = jwt.sign(
        {
          userId: emailExist._id,
          name: emailExist.name,
          email: emailExist.email,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        status: "success",
        message: "Authentication Successful",
        token: token,
        userDetails: emailExist,
      });
    } else {
      throw Error;
    }
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      error: "loginError",
      message: "Your Email or Password is incorrect",
    });
  }
});

router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(409).json({
      status: "fail",
      error: "emailError",
      message: "Email is already registered",
    });
  }
  try {
    const salt = await bcrypt.genSalt();
    var passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    return res.status(201).json({
      status: "success",
      message: "User has successfully registered",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
