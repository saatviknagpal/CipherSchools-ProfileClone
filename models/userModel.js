const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, default: null },
  picture: { type: String, default: "" },
  bio: { type: String, default: "" },
  linkedIn: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  highestEducation: {
    type: String,
    default: "",
  },
  currently: {
    type: String,
    default: "",
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
