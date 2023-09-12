const mongoose = require("mongoose");

const { mongodb_url } = require("../secrets/keys");
// console.log(mongodb_url);

mongoose.connect(mongodb_url).catch((err) => {
  console.log(err.message);
  console.log("Failed to connect mongodb server");
});
