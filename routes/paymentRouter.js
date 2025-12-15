const express = require("express");
const authController = require("./../controllers/authController.js");
const paymentController = require("./../controllers/paymentController.js");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route("/").get(paymentController.getPaymentHistory);
router.route("/").post(paymentController.makePayment);
router.route("/:sessionId").get(paymentController.sessionStatus);

module.exports = router;
