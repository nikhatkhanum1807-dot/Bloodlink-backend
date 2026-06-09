const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express(); // ✅ MUST be first after imports

const userRoutes = require("./routes/userRoutes");
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");

// middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://vercel.com/nikhatkhanum1807-dots-projects/bloodlink/GUAqp8UAbB68nuzKdHySz2eujKMo"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);

// test route
app.get("/", (req, res) => {
  res.send("BloodLink Backend Running");
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(5001, () => {
    console.log("Server started on port 5001");
  });
})
.catch((err) => {
  console.log(err.message);
});