const fs = require("fs");

const key = fs.readFileSync("./firebase_SDK.json", "utf-8");
const encode = Buffer.from(key).toString("base64");
console.log(encode);
