const jwt = require("jsonwebtoken");
const CustomError = require("../utils/custom.error");
const config = require("../config/variables");
const User = require("../models/User");

class AuthMiddleware {
  validateUserStatus = (req, res, next) => {
    const user = req.user;
    if (!user.isActive) {
      return {
        status: "failed",
        message: "Your account is not active. Please contact customer support!",
      };
    }

    return next();
  };

  validateBearerToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      let token;
      if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
      }
      if (!token) {
        return next(CustomError("Invalid token", 401));
      }

      const decoded = jwt.verify(token, config.JWT_SCRECT_KEY);
      if (!decoded || decoded.type !== "LOGIN_TOKEN") {
        return next(
          CustomError(
            "Invalid token or token has expired! Please log out and login again",
            401
          )
        );
      }
      const user = await User.findOne({
        _id: decoded.id,
        accessToken: token,
      }).select("-password -accessToken");

      if (!user) {
        return next(
          CustomError(
            "Invalid token or token has exxpired, please log out and login again",
            401
          )
        );
      }
      req.user = user;
      next();
    } catch (error) {}
  };
}

module.exports = new AuthMiddleware();
