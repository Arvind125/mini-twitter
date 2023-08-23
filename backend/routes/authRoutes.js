const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // For password hashing
const User = require("../databases/User");
const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../secrets/keys");

// Register a new user
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, jwt_secret_key, {
      expiresIn: "2h",
    });

    return res
      .status(201)
      .json({
        token,
        userId: user._id,
        name,
        message: "User registered successfully",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //   console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, jwt_secret_key, {
      expiresIn: "2h",
    });

    return res
      .status(200)
      .json({
        token,
        userId: user._id,
        name: user.name,
        message: "User Logged in successfully",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while logging in" });
  }
});

module.exports = router;
