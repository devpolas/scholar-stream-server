const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("@dotenvx/dotenvx").config();
const scholarshipRouter = require("./routes/scholarshipsRouter.js");
const userRouter = require("./routes/usersRouter.js");
const reviewRouter = require("./routes/reviewsRouter.js");
const applicationRouter = require("./routes/applicationRouter.js");
const paymentRouter = require("./routes/paymentRouter.js");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// default requests
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from server!",
  });
});

app.post("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This route You only test the server! Hello from server!",
  });
});

app.patch("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This route You only test the server! Hello from server!",
  });
});

app.put("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This route You only test the server! Hello from server!",
  });
});

app.delete("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This route You only test the server! Hello from server!",
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  console.log("Hit application router:", req.originalUrl);
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/scholarships", scholarshipRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/payments", paymentRouter);

// handel unrecognized routes
app.all("/*splat", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
