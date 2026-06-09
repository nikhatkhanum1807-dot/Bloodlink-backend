const express = require("express");
const router = express.Router();

const Donor = require("../models/Donor");

// GET all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD donor
router.post("/", async (req, res) => {
  try {
    const { name, bloodGroup, phone, city } = req.body;

    const newDonor = new Donor({
      name,
      bloodGroup,
      phone,
      city,
      available: true,
    });

    await newDonor.save();

    res.json({
      message: "Donor added successfully",
      donor: newDonor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE donor
router.delete("/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Donor deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
