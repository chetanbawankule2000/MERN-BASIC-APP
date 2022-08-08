const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/userController");

//logon Route
router.post("/login", loginUser);

//signup Route
router.post("/signup", signupUser);

module.exports = router;
