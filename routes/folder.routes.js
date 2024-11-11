const express = require("express");
const FolderController = require("../controllers/folder.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.use(
  AuthMiddleware.validateBearerToken,
  AuthMiddleware.validateUserStatus
);

router
  .route("/")
  .post(FolderController.createFolder)
  .get(FolderController.getFolders);

router
  .route("/:id")
  .get(FolderController.getFolder)
  .patch(FolderController.updateFolder)
  .delete(FolderController.deleteFolder);

module.exports = router;
