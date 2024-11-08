const bcrypt = require("bcryptjs");
const User = require("../models/User");
const CustomError = require("../utils/custom.error");
const jwt = require("jsonwebtoken");
const config = require("../config/variables");
const generateVerificationCode = require("../utils/verification.code");
const sendEmail = require("../utils/email");

class AuthController {
  register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({
          status: "Failed",
          message: "User with thesame email already exists",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = generateVerificationCode();
      const newUserPayload = {
        name,
        email,
        verificationCode,
        password: hashedPassword,
      };

      const user = await User.create(newUserPayload);

      try {
        await sendEmail({
          from: "notes-keeper@support.ng",
          to: user.email,
          subject: " Email Verification Code",
          text: `Your email verification code is ${verificationCode}`,
        });
        res.status(200).json({
          status: "Success",
          message: "Email verification code sent",
        });
      } catch (error) {
        user.save();
      }

      return res.status(200).json({
        status: "Success",
        data: user,
        message:
          "User registration successful, check email for veriification code!",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "An uexpected error occured, please try again!",
      });
    }
  };

  verifyEmail = async (req, res) => {
    try {
      const { email, verificationCode } = req.body;

      const userExists = await User.findOne({ email });

      if (!userExists) {
        return {
          status: "failed",
          message: "Account does not exist",
        };
      }

      if (userExists.emailVerified) {
        return {
          status: "failed",
          message: "email has already been verified",
        };
      }

      if (userExists.verificationCode !== verificationCode) {
        return res.status(400).json({ message: "Invalid verification code" });
      }
      userExists.emailVerified = true;
      userExists.verificationCode = undefined;
      await userExists.save();

      res.json({ message: "Email verified successfully" });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "An unexpected error occured, please try again!",
      });
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new CustomError("Please provide email and password", 400));
      }

      const userExists = await User.findOne({ email }).select("+password");
      if (!userExists) {
        return {
          status: "failed",
          message: "Account does not exist",
        };
      }

      if (!userExists.emailVerified) {
        return res
          .status(403)
          .json({ message: "Please verify your email before logging in." });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userExists.password
      );

      if (!isPasswordValid) {
        return {
          status: "failed",
          message: "Oops! You used the wrong credentials",
        };
      }

      const tokenPayload = {
        id: userExists._id,
        email: userExists.email,
        type: "LOGIN_TOKEN",
      };

      const token = jwt.sign(tokenPayload, config.JWT_SCRECT_KEY, {
        expiresIn: config.LOGIN_EXPIRES,
      });
      userExists.accessToken = token;
      await userExists.save();

      res.status(200).json({
        status: "Success",
        message: "User login successful",
        data: userExists,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "An unexpected error occured, please try again!",
      });
    }
  };

  logout = async (req, res, next) => {
    try {
      const userId = req.user._id;
      await User.findByIdAndUpdate(userId, { accessToken: null });
      res.json({
        message: "Logout Successful",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "An unexpected error occured, please try again!",
      });
    }
  };
}
module.exports = new AuthController();
