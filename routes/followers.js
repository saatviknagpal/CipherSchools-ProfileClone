const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const checkauth = require("../middlewares/checkauth");
const Follower = require("../models/followersModel");

router.get("/get_followers/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const followerList = await User.findById(id).populate("followers");
    return res.status(200).json({
      status: "success",
      message: "Followers fetched successfully",
      data: followerList.followers,
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update_followers", async (req, res, next) => {
  try {
    const { firstName, lastName, currently, followedUserId, user_id, picture } =
      req.body;
    const followers = new Follower({
      firstName,
      lastName,
      followedUserId,
      currently,
      user_id,
      picture,
    });

    const userFollower = await followers.save();
    const findUser = await User.findByIdAndUpdate(
      {
        _id: followedUserId,
      },
      {
        $push: {
          followers: userFollower._id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return res.status(201).json({
      status: "success",
      follower: userFollower,
      message: "Follower Successfully Added",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
