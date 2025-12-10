const firebaseAdmin = require("firebase-admin");
const catchAsync = require("./../utils/catchAsync.js");
const User = require("./../models/usersModel.js");

const firebase_sdk = Buffer.from(
  process.env.FIREBASE_SDK_KEY,
  "base64"
).toString("utf-8");

const serviceAccount = JSON.parse(firebase_sdk);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res
      .status(401)
      .json({ status: "fail", message: "Please login first" });

  try {
    decodeUser = await firebaseAdmin.auth().verifyIdToken(token);
  } catch (err) {
    console.error("Firebase token verification failed:", err);
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid or expired token" });
  }

  const currentUser = await User.findOne({ email: decodeUser.email });
  if (!currentUser) {
    return res.status(401).json({ status: "fail", message: "User not found" });
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "unauthorized access, You can't perform this act!",
      });
    }
    next();
  };
};
