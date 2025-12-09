const express = require("express");
const morgan = require("morgan");
require("@dotenvx/dotenvx").config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

module.exports = app;
