const express = require("express");
const authController = require("./../controllers/authController.js");
const applicationController = require("./../controllers/applicationController.js");
const paymentRouter = require("./../routes/paymentRouter.js");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.use("/:applicationId/payments", paymentRouter);

router
  .route("/")
  .get(applicationController.getAllApplications)
  .post(applicationController.createApplication);

router
  .route("/:id")
  .get(applicationController.getApplication)
  .delete(applicationController.deleteApplication)
  .patch(
    authController.restrictTo("Admin", "Moderator"),
    applicationController.updateApplication
  );

module.exports = router;
