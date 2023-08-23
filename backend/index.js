const express = require("express");
const cors = require("cors");

require("./databases/config");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/authRoutes"));

app.use(requireAuth);
app.use("/user", require("./routes/usersRoutes"));
app.use("/connection", require("./routes/follow-unfollowRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}/`);
});
