const express = require("express");
const reviewController = require("./../controllers/reviewsController.js");
const authController = require("./../controllers/authController.js");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(reviewController.getAllReview)
  .post(authController.restrictTo("student"), reviewController.createReview);

router
  .route("/:id")
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  )
  .get(reviewController.getReview)
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

module.exports = router;
