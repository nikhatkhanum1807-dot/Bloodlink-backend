const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

// PROFILE ROUTE
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "You are authorized",
    userId: req.user.id,
  });
});

module.exports = router;
