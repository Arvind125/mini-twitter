const express = require("express");
const cors = require("cors");

require("./databases/config")

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/authRoutes'));
app.use("/users", require("./routes/usersRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}/`);
})

