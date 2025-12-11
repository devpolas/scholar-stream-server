const app = require("./app.js");
require("@dotenvx/dotenvx").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

const dbUser = process.env.DB_URL.replace("<USER>", process.env.DB_USER);
const db = dbUser.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(db).then(() => {
  console.log("Database Connected Successfully!");
});

const server = app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});

process.on("uncaughtException", (err) => {
  console.log("UncaughtException Error", err);
  console.log("UncaughtException Error server Shutting Down......");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection Error", err);
  console.log("unhandledRejection Error Server Shutting Down.....");
});
