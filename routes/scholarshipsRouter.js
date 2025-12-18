const express = require("express");
const scholarshipController = require("../controllers/scholarshipsController");
const authController = require("./../controllers/authController.js");
const reviewRouter = require("./reviewsRouter.js");
const applicationRoute = require("./applicationRouter.js");

const router = express.Router({ mergeParams: true });

router.use("/:scholarshipId/reviews", reviewRouter);
router.use("/:scholarshipId/applications", applicationRoute);

router
  .route("/")
  .get(scholarshipController.getAllScholarships)
  .post(
    authController.protect,
    authController.restrictTo("Admin"),
    scholarshipController.addScholarship
  );

router
  .route("/:id")
  .get(scholarshipController.getScholarship)
  .patch(
    authController.protect,
    authController.restrictTo("Admin"),
    scholarshipController.updateScholarship
  )
  .delete(
    authController.protect,
    authController.restrictTo("Admin"),
    scholarshipController.deleteScholarship
  );

module.exports = router;
