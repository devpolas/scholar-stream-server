const express = require("express");
const authController = require("./../controllers/authController.js");
const applicationController = require("./../controllers/applicationController.js");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(applicationController.getAllApplications)
  .post(applicationController.createApplication);

router
  .route("/:id")
  .get(applicationController.getApplication)
  .delete(applicationController.deleteApplication)
  .patch(
    authController.restrictTo("admin", "moderator"),
    applicationController.updateApplication
  );

module.exports = router;
