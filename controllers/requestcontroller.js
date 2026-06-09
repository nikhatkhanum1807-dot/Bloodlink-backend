const BloodRequest = require("../models/BloodRequest");
const Donor = require("../models/Donor");

exports.createRequest = async (req, res) => {
  try {
    const { patientName, bloodGroup, city, hospital, units } = req.body;

    const request = await BloodRequest.create({
      patientName,
      bloodGroup,
      city,
      hospital,
      units,
    });

    // AUTO MATCH DONORS
    const matchedDonors = await Donor.find({
      bloodGroup,
      city,
      available: true,
    });

    res.status(201).json({
      message: "Blood request created successfully",
      request,
      matchedDonors,
      count: matchedDonors.length,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};