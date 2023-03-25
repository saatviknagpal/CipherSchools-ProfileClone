const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number },
  picture: { type: String },
  bio: { type: String },
  linkedIn: {
    type: String,
  },
  gitHub: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  website: {
    type: String,
  },
  highestEducation: {
    type: String,
  },
  currently: {
    type: String,
  },
  interests: [{ type: String }],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Followers",
    },
  ],
});

const model = mongoose.model("Users", User);

module.exports = model;
