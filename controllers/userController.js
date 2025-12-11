const User = require("./../models/usersModel.js");
const catchAsync = require("./../utils/catchAsync.js");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (users.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "No users found",
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched all users",
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "No user found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully fetched user",
    data: user,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      status: "fail",
      message: "name and email are required",
    });
  }

  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.status(200).json({
      status: "success",
      message: "already have a user",
      data: existUser,
    });
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
  });

  res.status(201).json({
    status: "success",
    message: "successfully created new user",
    data: newUser,
  });
});

function filterBody(fields, allowed) {
  const newObject = {};
  Object.keys(fields).forEach((el) => {
    if (allowed.includes(el)) newObject[el] = fields[el];
  });
  return newObject;
}

exports.updateUser = catchAsync(async (req, res, next) => {
  const filterData = filterBody(req.body, ["name", "image"]);

  if (Object.keys(filterData).length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "No valid fields provided for update",
    });
  }

  const user = await User.findByIdAndUpdate(req.user._id, filterData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user not found!",
    });
  }

  res.status(200).json({
    status: "success",
    message: "user updated successfully",
    data: user,
  });
});

// this function run only admin
exports.updateUserRole = catchAsync(async (req, res, next) => {
  if (!req.body.role) {
    return res.status(400).json({
      status: "fail",
      message: "Role is required",
    });
  }
  const updateUserRole = await User.findByIdAndUpdate(
    req.params.id,
    {
      role: req.body.role,
    },
    { new: true, runValidators: true }
  );
  if (!updateUserRole) {
    return res.status(404).json({
      status: "fail",
      message: "user not found!",
    });
  }
  res.status(200).json({
    status: "success",
    message: "user updated successfully",
    data: updateUserRole,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user not found",
    });
  }

  res.status(200).json({ status: "success", message: "user deleted" });
});
