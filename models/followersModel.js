const mongoose = require("mongoose");

const Follower = new mongoose.Schema({
  name: { type: String, required: true },
});

const model = mongoose.model("Followers", Follower);

module.exports = model;
