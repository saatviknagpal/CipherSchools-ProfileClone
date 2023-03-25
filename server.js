const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
