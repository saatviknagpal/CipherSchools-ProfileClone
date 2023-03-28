const User = require("../models/userModel");
const cloudinary = require("../lib/cloudinary");

exports.uploadImage = async (req, res) => {
  if (req.body.file !== "undefined") {
    const result = await cloudinary.uploader.upload(req.file.path);
    try {
      const user = await User.findById(req.userData.userId);
      console.log(user, result);
      user.picture = result.url;
      await user.save();
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  try {
    const data = req.body;
    const user = await User.findById(req.userData.userId);
    if (user) {
      for (prop in data) {
        if (user[prop] !== undefined) user[prop] = data[prop];
      }
      await user.save();
    }
    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
