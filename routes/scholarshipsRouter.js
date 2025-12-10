const express = require("express");
const scholarshipController = require("../controllers/scholarshipsController");
const authController = require("./../controllers/authController.js");
const reviewRouter = require("./../routes/reviewsRouter.js");

const router = express.Router();

router.use("/:scholarshipId/reviews", reviewRouter);

router
  .route("/")
  .get(scholarshipController.getAllScholarships)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    scholarshipController.addScholarship
  );

router
  .route("/:id")
  .get(scholarshipController.getScholarship)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    scholarshipController.updateScholarship
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    scholarshipController.deleteScholarship
  );

module.exports = router;
