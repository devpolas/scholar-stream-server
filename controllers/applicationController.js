const catchAsync = require("./../utils/catchAsync.js");
const Application = require("./../models/applicationModal.js");

exports.createApplication = catchAsync(async (req, res, next) => {
  if (!req.body.scholarship) req.body.scholarship = req.params.id;
  if (!req.body.user) req.body.user = req.user._id;
  const newApplication = await Application.create(req.body);

  res.status(201).json({
    status: "success",
    message: "successfully applied",
    data: newApplication,
  });
});

exports.getApplication = catchAsync(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      status: "fail",
      message: "No application found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched application",
    data: application,
  });
});

exports.getAllApplications = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.userId) filter = { user: req.params.userId };

  const allApplications = await Application.find(filter);

  if (allApplications.length === 0) {
    return res
      .status(200)
      .json({ status: "success", message: "No applications found", data: [] });
  }
  res.status(200).json({
    status: "success",
    message: "successfully fetched applications",
    data: allApplications,
  });
});

const filterBody = (fields, allowFields) => {
  let newObj = {};
  Object.keys(fields).forEach((el) => {
    if (allowFields.includes(el)) {
      newObj[el] = fields[el];
    }
  });
  return newObj;
};

exports.updateApplication = catchAsync(async (req, res, next) => {
  const filteredBody = filterBody(req.body, [
    "applicationStatus",
    "paymentStatus",
    "feedback",
  ]);

  if (Object.keys(filteredBody).length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "No valid fields provided for update",
    });
  }

  const updatedApplication = await Application.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!updatedApplication) {
    return res
      .status(404)
      .json({ status: "fail", message: "No application found for update" });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully updated application",
    data: updatedApplication,
  });
});

exports.deleteApplication = catchAsync(async (req, res, next) => {
  const deletedApplication = await Application.findByIdAndDelete(req.params.id);
  if (!deletedApplication) {
    return res
      .status(404)
      .json({ status: "fail", message: "no application found for delete" });
  }

  res
    .status(200)
    .json({ status: "success", message: "successfully deleted Application" });
});
