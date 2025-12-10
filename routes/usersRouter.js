const express = require("express");
const userController = require("./../controllers/userController.js");
const authController = require("./../controllers/authController.js");
const applicationRouter = require;
("./../routes/applicationRouter.js");

const router = express.Router();

router.use("/:userId/applications", authController.protect, applicationRouter);

router
  .route("/")
  .post(userController.createUser)
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

router
  .route("/:id")
  .get(authController.protect, userController.getUsers)
  .patch(authController.protect, userController.updateUser)
  .delete(
    authController.protect,
    authController.restrictTo("student", "admin"),
    userController.deleteUser
  );

router
  .route("/update-role/:id")
  .patch(authController.restrictTo("admin"), userController.updateUserRole);

module.exports = router;
