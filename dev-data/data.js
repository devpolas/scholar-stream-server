require("@dotenvx/dotenvx").config();
const fs = require("fs");
const mongoose = require("mongoose");
const Scholarship = require("./../models/scholarshipsModel.js");

const dbUser = process.env.DB_URL.replace("<USER>", process.env.DB_USER);
const db = dbUser.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(db).then(() => {
  console.log("Database Connected Successfully!");
});

const scholarships = JSON.parse(
  fs.readFileSync(`${__dirname}/scholarships.json`, "utf-8")
);

const insertScholarships = async () => {
  try {
    await Scholarship.create(scholarships);
    console.log("scholarships Data Insert Successfully!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

insertScholarships();
