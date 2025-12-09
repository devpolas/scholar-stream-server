const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "User must have a name"] },
  email: {
    type: String,
    required: [true, "User must have a name"],
    unique: true,
  },
  image: { type: String, required: [true, "User must have a profile Image"] },
  role: {
    type: String,
    enum: {
      values: ["student", "moderator", "admin"],
      message: `"{VALUE}" not supported You should choose either "student", "moderator", "admin"`,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
