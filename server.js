const app = require("./app.js");
require("@dotenvx/dotenvx").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

const dbUrl = process.env.DB_URL.replace("<USER>", process.env.DB_USER).replace(
  "<PASSWORD>",
  encodeURIComponent(process.env.DB_PASSWORD)
);

mongoose
  .connect(dbUrl)
  .then(() => console.log("Database Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

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
