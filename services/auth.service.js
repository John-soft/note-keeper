const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/variables");

class AuthService {
  register = async (payload) => {
    try {
      const { name, email, password } = payload;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return {
          status: "Failed",
          message: "User with thesame email exists ",
        };
      }
      //hashed password
      let hashedPassword = bcrypt.hashSync(password, 10);
      //create user
      const newUserPayload = {
        email,
        name,
        password: hashedPassword,
      };
      const user = await User.create(newUserPayload);
      return {
        status: "Success",
        message: "User registration successful",
        data: {
          user,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: "An unexpected error occurred, try again later",
      };
    }
  };
  login = async () => {};
}

module.exports = new AuthService();
