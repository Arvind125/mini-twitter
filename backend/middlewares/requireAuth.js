const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../secrets/keys");
const User = require("../databases/User");

const requireAuth = async (req, res, next) => {
  let token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token not provided" });
  }

  try {
    token = token.split(" ")[1];
    // console.log(token);
    const decodedToken = jwt.verify(token, jwt_secret_key);
    // console.log(decodedToken);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = requireAuth;
