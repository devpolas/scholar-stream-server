const express = require("express");
const userController = require("./../controllers/userController.js");
const authController = require("./../controllers/authController.js");
const applicationRouter = require("./../routes/applicationRouter.js");
const reviewRouter = require("./../routes/reviewsRouter.js");
const paymentRouter = require("./../routes/paymentRouter.js");

const router = express.Router();

router.use("/:userId/applications", authController.protect, applicationRouter);
router.use("/:userId/reviews", authController.protect, reviewRouter);
router.use("/:userId/payments/history", authController.protect, paymentRouter);

router
  .route("/")
  .post(userController.createUser)
  .patch(authController.protect, userController.updateUser)
  .get(
    authController.protect,
    authController.restrictTo("Admin", "Moderator"),
    userController.getAllUsers
  );

router.route("/me").get(authController.protect, userController.getUser);

router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("Student", "Admin"),
    userController.deleteUser
  );

router
  .route("/update-role/:id")
  .patch(
    authController.protect,
    authController.restrictTo("Admin"),
    userController.updateUserRole
  );

module.exports = router;
