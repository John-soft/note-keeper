const express = require("express");
const router = express.Router();
const NoteController = require("../controllers/note.controller");
router.post("/create-note", NoteController.createNote);

module.exports = router;
