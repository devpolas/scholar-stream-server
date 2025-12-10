const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  scholarship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scholarship",
    required: [true, "Application must belong to a scholarship"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Application must belong to a user"],
  },
  applicationStatus: {
    type: String,
    enum: {
      values: ["pending", "processing", "completed", "rejected"],
      message: `"{VALUE}" not supported You should choose either "pending", "processing", "completed", "rejected"`,
    },
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: {
      values: ["unpaid", "paid"],
      message: `"{VALUE}" not supported You should choose either "unpaid", "paid"`,
    },
    default: "unpaid",
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  feedback: {
    type: String,
    trim: true,
    minLength: [10, "feedback minimum length 10 characters"],
    maxLength: [300, "feedback maximum length 300 characters"],
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
