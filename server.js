const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URL;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Routes
app.use("/auth", auth);
app.use("/profile", profile);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
