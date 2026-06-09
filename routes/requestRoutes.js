const express = require("express");
const router = express.Router();

const { createRequest } = require("../controllers/requestController");

// CREATE BLOOD REQUEST
router.post("/", createRequest);

module.exports = router;