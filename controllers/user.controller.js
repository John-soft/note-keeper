const User = require("../models/User");
class UserController {
  getAllUsers = async (req, res, next) => {
    try {
      const user = await User.find({ isActive: true }).select("-accessToken");
      res.status(200).json({
        status: "Success",
        user,
        message: "All users successfully retrieved",
      });
    } catch (error) {
      return {
        status: "failed",
        message: "An unexpected error occured, please try again!",
      };
    }
  };

  getUser = async (req, res) => {
    try {
      const id = req.params.id;

      const user = await User.findById(id).select("-accessToken");
      if (!user) {
        return {
          status: "failed",
          message: "User does not exists",
        };
      }
      res.status(200).json({
        status: "Success",
        data: user,
        message: "User data retrieved",
      });
    } catch (error) {
      return {
        status: "failed",
        message: "An unexpected error occured, please try again!",
      };
    }
  };

  deleteUser = async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user._id, { isActive: false });
      res.status(204).json({
        status: "Success",
        data: null,
      });
    } catch (error) {
      return {
        status: "failed",
        message: "An unexpected error occured, please try again!",
      };
    }
  };
}

module.exports = new UserController();
