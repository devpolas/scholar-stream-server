const express = require("express");
const userController = require("./../controllers/userController.js");
const authController = require("./../controllers/authController.js");
const applicationRouter = require("./../routes/applicationRouter.js");

const router = express.Router();

router.use("/:userId/applications", authController.protect, applicationRouter);

router
  .route("/")
  .post(userController.createUser)
  .patch(authController.protect, userController.updateUser)
  .get(
    authController.protect,
    authController.restrictTo("admin", "moderator"),
    userController.getAllUsers
  );

router.route("/me").get(authController.protect, userController.getUser);

router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("student", "admin"),
    userController.deleteUser
  );

router
  .route("/update-role/:id")
  .patch(authController.restrictTo("admin"), userController.updateUserRole);

module.exports = router;
