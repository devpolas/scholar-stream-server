const express = require("express");
const morgan = require("morgan");
require("@dotenvx/dotenvx").config();
const scholarshipRouter = require("./routes/scholarshipsRouter.js");

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/scholarships", scholarshipRouter);

module.exports = app;
