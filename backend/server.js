const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/test");

app.get("/api/users", (req, res) => {
  res.json([{ name: "Sridhar" }]);
});

app.listen(5000, () => console.log("Server running"));
