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
      values: ["Pending", "Processing", "Completed", "Rejected"],
      message: `"{VALUE}" not supported You should choose either "Pending", "Processing", "Completed", "Rejected"`,
    },
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: {
      values: ["Unpaid", "Paid"],
      message: `"{VALUE}" not supported You should choose either "unpaid", "paid"`,
    },
    default: "Unpaid",
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

applicationSchema.pre(/^find/, function () {
  this.populate({
    path: "user",
  }).populate({
    path: "scholarship",
  });
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
