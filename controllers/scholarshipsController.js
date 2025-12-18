const catchAsync = require("./../utils/catchAsync.js");
const Scholarship = require("./../models/scholarshipsModel.js");

exports.getAllScholarships = catchAsync(async (req, res, next) => {
  const {
    search,
    universityCountry,
    subjectCategory,
    sort,
    page = 1,
    limit = 10,
  } = req.query;

  // Build query object dynamically
  const queryObj = {};

  // Search by scholarshipName, universityName, or degree (case-insensitive)
  if (search) {
    const searchRegex = new RegExp(search, "i");
    queryObj.$or = [
      { scholarshipName: searchRegex },
      { universityName: searchRegex },
      { degree: searchRegex },
    ];
  }

  // Filter by universityCountry
  if (universityCountry) queryObj.universityCountry = universityCountry;

  // Filter by subjectCategory
  if (subjectCategory) queryObj.subjectCategory = subjectCategory;

  // Build query
  let query = Scholarship.find(queryObj);

  // Sorting
  if (sort) {
    const sortBy = sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-scholarshipPostDate");
  }

  // Pagination
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  query = query.skip(skip).limit(limitNumber);

  const scholarships = await query;

  // Total documents for pagination info
  const totalDocs = await Scholarship.countDocuments(queryObj);
  const totalPages = Math.ceil(totalDocs / limitNumber);

  if (scholarships.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "No scholarships found matching your criteria",
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched scholarships",
    results: scholarships.length,
    page: pageNumber,
    totalPages,
    totalResults: totalDocs,
    data: scholarships,
  });
});

// exports.getAllScholarships = catchAsync(async (req, res, next) => {
//   const scholarships = await Scholarship.find();
//   if (scholarships.length === 0) {
//     return res.status(200).json({
//       status: "success",
//       message: "No scholarship found",
//       data: [],
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     message: "Successfully fetched all scholarships",
//     data: scholarships,
//   });
// });

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
