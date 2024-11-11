const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth.middleware");
const NoteController = require("../controllers/note.controller");
router.post(
  "/create-note",
  AuthMiddleware.validateBearerToken,
  NoteController.createNote
);
router.get(
  "/view-notes",
  AuthMiddleware.validateBearerToken,
  NoteController.viewAllNotes
);

router.get(
  "/view-note/:id",
  AuthMiddleware.validateBearerToken,
  NoteController.viewNote
);

router.patch(
  "/edit-note/:id",
  AuthMiddleware.validateBearerToken,
  NoteController.editNote
);

router.delete(
  "/delete-note/:id",
  AuthMiddleware.validateBearerToken,
  NoteController.deleteNote
);

module.exports = router;
