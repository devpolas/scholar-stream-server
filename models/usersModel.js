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
      values: ["Student", "Moderator", "Admin"],
      message: `"{VALUE}" not supported You should choose either "Student", "Moderator", "Admin"`,
    },
    default: "Student",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
