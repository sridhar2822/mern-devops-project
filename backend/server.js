const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection with proper handling
mongoose
  .connect("mongodb://mongo:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// API
app.get("/api/users", (req, res) => {
  res.json([{ name: "Sridhar" }]);
});

// Health check (important for DevOps)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// FIX: bind to 0.0.0.0
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
