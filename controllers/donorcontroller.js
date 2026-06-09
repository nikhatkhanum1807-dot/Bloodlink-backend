const Donor = require("../models/Donor");

exports.getDonors = async (req, res) => {
  try {
    let { bloodGroup, city } = req.query;

    let filter = {};

    // FIX: normalize inputs
    if (bloodGroup) {
      bloodGroup = bloodGroup.trim().replace("%2B", "+");
      filter.bloodGroup = bloodGroup; // EXACT MATCH (SAFE)
    }

    if (city) {
      city = city.trim();
      filter.city = city; // EXACT MATCH (SAFE)
    }

    const donors = await Donor.find(filter);

    res.json({
      count: donors.length,
      donors,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};