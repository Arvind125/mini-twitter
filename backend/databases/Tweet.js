const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  content: {
    type: String,
    maxlength: 300,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
