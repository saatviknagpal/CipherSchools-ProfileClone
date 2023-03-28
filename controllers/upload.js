const User = require("../models/userModel");
const cloudinary = require("../lib/cloudinary");

exports.uploadImage = async (req, res) => {
  await cloudinary.uploader.upload(
    req.file.path,

    async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      const data = req.body;
      const user = await User.findById(req.userData.userId);
      if (user) {
        user.picture = result.url;
        for (prop in data) {
          if (user[prop] !== undefined) user[prop] = data[prop];
        }
        await user.save();
      }

      try {
        return res.status(200).json({
          status: "success",
          message: "User updated successfully",
          data: result,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: "fail",
          message: err.message,
        });
      }
    }
  );
};
