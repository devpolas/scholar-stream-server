const express = require("express");
const userController = require("./../controllers/userController.js");
const authController = require("./../controllers/authController.js");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUsers)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route("/update-role/:id")
  .patch(authController.restrictTo("admin"), userController.updateUserRole);

module.exports = router;
