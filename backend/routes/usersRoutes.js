const express = require("express")
const User = require("../databases/User");

const router = express.Router();

router.get("/all", async(req, res) => {
    let users = await User.find({});
    
    // let result = [];
    // users.map(item => result.push(delete item.password));
    // console.log(result);
    res.send(users);
})

module.exports = router;