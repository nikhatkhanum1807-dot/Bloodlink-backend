const mongoose = require("mongoose");
require("dotenv").config();

const Donor = require("../models/Donor");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("Connected");

  const donors = await Donor.find();

  const seen = new Set();
  const duplicates = [];

  for (let d of donors) {
    const key = d.phone; // using phone as unique key

    if (seen.has(key)) {
      duplicates.push(d._id);
    } else {
      seen.add(key);
    }
  }

  await Donor.deleteMany({ _id: { $in: duplicates } });

  console.log("Deleted duplicates:", duplicates.length);

  process.exit();
});