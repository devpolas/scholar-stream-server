const express = require("express");
const reviewController = require("./../controllers/reviewsController.js");
const authController = require("./../controllers/authController.js");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(reviewController.getAllReview)
  .post(
    authController.protect,
    authController.restrictTo("Student"),
    reviewController.createReview
  );

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo("Student", "Admin", "Moderator"),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo("Student", "Admin", "Moderator"),
    reviewController.deleteReview
  );

module.exports = router;
