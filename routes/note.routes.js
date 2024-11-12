const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth.middleware");
const NoteController = require("../controllers/note.controller");

router.use(
  AuthMiddleware.validateBearerToken,
  AuthMiddleware.validateUserStatus
);
router.post("/create-note", NoteController.createNote);

router.get("/view-notes", NoteController.viewAllNotes);

router.get("/search", NoteController.searchNote);

router.get("/view-note/:id", NoteController.viewNote);

router.patch("/edit-note/:id", NoteController.editNote);

router.delete("/delete-note/:id", NoteController.deleteNote);

module.exports = router;
