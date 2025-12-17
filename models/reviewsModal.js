const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    scholarship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: [true, "Review must belong to a scholarship"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    comment: { type: String, required: [true, "Review can't be empty!"] },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Review must belong to a rating"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function () {
  this.populate({
    path: "scholarship",
    select: "scholarshipName",
  }).populate({
    path: "user",
    select: "name",
  });
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
