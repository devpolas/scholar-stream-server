const catchAsync = require("./../utils/catchAsync.js");
const Review = require("./../models/reviewsModal.js");

exports.getAllReview = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.scholarshipId) filter.scholarship = req.params.scholarshipId;

  if (req.params.userId) filter.user = req.params.userId;

  const reviews = await Review.find(filter);
  if (reviews.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "No reviews found",
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    message: "successfully fetched reviews",
    data: reviews,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({
      status: "fail",
      message: "No review found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "successfully fetched review",
    data: review,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.scholarship) req.body.scholarship = req.params.scholarshipId;
  if (!req.body.user) req.body.user = req.user._id;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    message: "review created successfully",
    data: review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedReview) {
    return res
      .status(404)
      .json({ status: "fail", message: "fail to update review" });
  }

  res.status(200).json({
    status: "success",
    message: "review updated successfully",
    data: updatedReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.id);

  if (!deletedReview) {
    return res.status(404).json({
      status: "fail",
      message: "No review found to delete",
    });
  }

  res.status(204).json({
    status: "success",
    message: "review deleted successfully",
    data: null,
  });
});
