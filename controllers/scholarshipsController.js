const catchAsync = require("./../utils/catchAsync.js");
const Scholarship = require("./../models/scholarshipsModel.js");

exports.getAllScholarships = catchAsync(async (req, res, next) => {
  const scholarships = await Scholarship.find();
  if (scholarships.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "No scholarship found",
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched all scholarships",
    data: scholarships,
  });
});

exports.getScholarship = catchAsync(async (req, res, next) => {
  const scholarship = await Scholarship.findById(req.params.id);

  if (!scholarship) {
    return res.status(404).json({
      status: "fail",
      message: "No scholarship found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched scholarship",
    data: scholarship,
  });
});

exports.addScholarship = catchAsync(async (req, res, next) => {
  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    universityWorldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipPostDate,
    postedUserEmail,
  } = req.body;

  const newScholarship = await Scholarship.create({
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    universityWorldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipPostDate,
    postedUserEmail,
  });

  res.status(201).json({
    status: "success",
    message: "scholarship created successfully",
    data: newScholarship,
  });
});

exports.updateScholarship = catchAsync(async (req, res, next) => {
  const scholarship = await Scholarship.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!scholarship) {
    return res.status(404).json({
      status: "fail",
      message: "Scholarship not found!",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Scholarship updated successfully",
    data: scholarship,
  });
});

exports.deleteScholarship = catchAsync(async (req, res, next) => {
  const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
  if (!scholarship) {
    return res.status(404).json({
      status: "fail",
      message: "scholarship not found",
    });
  }

  res.status(200).json({ status: "success", message: "Scholarship deleted" });
});
