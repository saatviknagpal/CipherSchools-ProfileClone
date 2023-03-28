const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const checkauth = require("../middlewares/checkauth");
const storage = require("../lib/multer");
const uploadController = require("../controllers/upload");

router.get("/get_profile/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
});

router.put("/update_profile", checkauth, async (req, res, next) => {
  const data = req.body;
  try {
    const user = await User.findById(req.userData.userId);
    if (user) {
      for (prop in data) {
        if (user[prop] !== undefined) user[prop] = data[prop];
      }
      const updatedUser = await user.save();
      return res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
});

router.put("/change_password", checkauth, async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const user = await User.findById(req.userData.userId);
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      console.log(valid);
      if (valid) {
        const salt = await bcrypt.genSalt();
        var passwordHash = await bcrypt.hash(newPassword, salt);
        user.password = passwordHash;
        await user.save();
        return res.status(200).json({
          status: "success",
          message: "Password updated successfully",
        });
      } else {
        return res.status(400).json({
          status: "fail",
          message: "Current password doesn't match with the database",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post(
  "/upload",
  checkauth,
  storage.single("file"),
  uploadController.uploadImage
);

module.exports = router;
