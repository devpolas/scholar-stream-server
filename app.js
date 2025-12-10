const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("@dotenvx/dotenvx").config();
const scholarshipRouter = require("./routes/scholarshipsRouter.js");
const userRouter = require("./routes/usersRouter.js");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/scholarships", scholarshipRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
