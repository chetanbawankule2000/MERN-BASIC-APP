const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//Login
userSchema.statics.login = async function (email, password) {
  //Validation
  if (!email || !password) {
    throw Error("All fields must be filled in");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password");
  }

  return user;
};

//Signup
userSchema.statics.signup = async function (email, password) {
  //Validation
  if (!email || !password) {
    throw Error("All fields must be filled in");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email: email, password: hash });
  return user;
};

module.exports = mongoose.model("User", userSchema);
