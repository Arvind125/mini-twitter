const express = require("express");
const User = require("../databases/User");

const router = express.Router();

// fetch data of logged in user
router.get("/me", async (req, res) => {
  const userId = req.user._id;
  // console.log(userId);
  try {
    let users = await User.findOne({ _id: userId }, "-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching users" });
  }
});

router.get("/all", async (req, res) => {
  try {
    let users = await User.find({}, "-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching users" });
  }
});

// Get users that are not followed by me
router.get("/not-followed", async (req, res) => {
  const userId = req.user._id;

  try {
    // Find users not followed by the current user
    const usersNotFollowed = await User.find({
      _id: { $nin: [userId, ...req.user.following] },
    });

    return res.status(200).json(usersNotFollowed);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching users not followed" });
  }
});

// fetch any random user based on id
router.get("/any/:id", async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    let users = await User.findOne({ _id: userId }, "-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching users" });
  }
});

module.exports = router;
