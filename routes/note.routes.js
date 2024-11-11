const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth.middleware");
const NoteController = require("../controllers/note.controller");
router.post(
  "/create-note",
  AuthMiddleware.validateBearerToken,
  AuthMiddleware.validateUserStatus,
  NoteController.createNote
);
router.get(
  "/view-notes",
  AuthMiddleware.validateBearerToken,
  AuthMiddleware.validateUserStatus,
  NoteController.viewAllNotes
);

router.get(
  "/view-note/:id",
  AuthMiddleware.validateBearerToken,
  AuthMiddleware.validateUserStatus,
  NoteController.viewNote
);

router.patch(
  "/edit-note/:id",
  AuthMiddleware.validateBearerToken,
  AuthMiddleware.validateUserStatus,
  NoteController.editNote
);

router.delete(
  "/delete-note/:id",
  AuthMiddleware.validateBearerToken,
  AuthMiddleware.validateUserStatus,
  NoteController.deleteNote
);

module.exports = router;
