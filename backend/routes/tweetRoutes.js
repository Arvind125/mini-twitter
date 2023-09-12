const express = require("express");
const router = express.Router();
const Tweet = require("../databases/Tweet");

// api to post a tweet
router.post("/create", async (req, res) => {
  const userId = req.user._id;
  try {
    const tweet = new Tweet({
      // tweet item created
      author: userId,
      content: req.body.tweetContent,
    });

    await tweet.save(); // commit in database
    return res
      .status(201)
      .json({ message: "Tweet posted successfully", tweet: tweet });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while posting the tweet" });
  }
});

// api to fetch tweets of user that he followed
router.get("/followings", async (req, res) => {
  try {
    const tweets = await Tweet.find({ author: { $in: req.user.following } })
      .sort("-timestamp") // Sort tweets by timestamp in descending order (latest first)
      .exec();

    return res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching tweets from following users",
    });
  }
});

// api to fetch tweets by self(me)
router.get("/me", async (req, res) => {
  try {
    const tweets = await Tweet.find({ author: req.user._id });

    return res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching self tweets",
    });
  }
});

// api to update an own tweet
router.put("/update/:tweetId", async (req, res) => {
  const { tweetId } = req.params;
  try {
    // we can add extra validations to check auth is right one
    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        content: req.body.newContent,
      },
      { new: true } // it allow to return updated one
    );

    return res
      .status(200)
      .json({ message: "Tweet updated successfully", tweet: updatedTweet });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating tweet data",
    });
  }
});

// api to delete an own tweet
router.delete("/delete/:tweetId", async (req, res) => {
  const { tweetId } = req.params;
  try {
    // we can add extra validations to check auth is right one
    const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

    if (!deletedTweet) {
      return res.status(401).json({ message: "Tweet not found!" });
    }
    return res
      .status(200)
      .send({ message: "Tweet deleted successfully", deletedTweet });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting the tweet",
    });
  }
});
module.exports = router;
