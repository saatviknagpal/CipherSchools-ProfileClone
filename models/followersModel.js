const mongoose = require("mongoose");

const Follower = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  followers: [{ type: String }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  currently: { type: String },
  picture: { type: String },
});

const model = mongoose.model("Followers", Follower);

module.exports = model;
