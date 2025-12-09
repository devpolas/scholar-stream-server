const express = require("express");
const scholarshipController = require("../controllers/scholarshipsController");

const router = express.Router();

router
  .route("/")
  .get(scholarshipController.getAllScholarships)
  .post(scholarshipController.addScholarship);

router
  .route("/:id")
  .get(scholarshipController.getScholarship)
  .patch(scholarshipController.updateScholarship)
  .delete(scholarshipController.deleteScholarship);

module.exports = router;
