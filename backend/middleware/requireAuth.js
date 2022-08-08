const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// this function works as a middleware to authorise the client request for any data
const requireAuth = async (req, res, next) => {
  // verify authentication

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authentication token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log("_id from ", _id);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log("Authorization error ", err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
