const express = require("express");
const UserController = require("../controllers/user.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.get(
  "/all-users",
  AuthMiddleware.validateBearerToken,
  UserController.getAllUsers
);

router.get("/:id", AuthMiddleware.validateBearerToken, UserController.getUser);

router.delete(
  "/delete-user",
  AuthMiddleware.validateBearerToken,
  UserController.deleteUser
);

module.exports = router;
