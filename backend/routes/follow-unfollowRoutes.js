const express = require("express");
const User = require("../databases/User");
const router = express.Router();

router.put("/follow", async (req, res) => {
  const myId = req.user._id;
  const followId = req.body.followId; // myId  (following) ----> followId

  try {
    // Update follower's following list
    await User.findByIdAndUpdate(myId, { $addToSet: { following: followId } });

    // Update target user's followers list
    await User.findByIdAndUpdate(followId, { $addToSet: { followers: myId } });

    return res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while following user" });
  }
});

// user unfollow end-point
router.put("/unfollow", async (req, res) => {
  const myId = req.user._id;
  const followId = req.body.followId;

  try {
    await User.findByIdAndUpdate(myId, { $pull: { following: followId } });
    await User.findByIdAndUpdate(followId, { $pull: { followers: myId } });
    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occured while un following user" });
  }
});

module.exports = router;
