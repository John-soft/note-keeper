const handleResponse = require("../helpers/response");
const Note = require("../models/Note");
class NoteController {
  createNote = async (req, res) => {
    try {
      const note = await Note.create(req.body);
      handleResponse(
        req,
        res,
        {
          data: note,
          message: "A new note created successfully",
        },
        201
      );
    } catch (error) {
      handleResponse(
        req,
        res,
        { message: "An error occured, please try again!" },
        500
      );
    }
  };

  viewAllNotes = async (req, res) => {
    try {
      const notes = await Note.find();
      if (!notes) {
        return {
          message: "Notes not found",
        };
      }
      handleResponse(
        req,
        res,
        {
          notes,
          message: "All notes retrieved successfully!!!",
        },
        200
      );
    } catch (error) {
      handleResponse(
        req,
        res,
        { message: "An error occured, please try again!" },
        500
      );
    }
  };

  viewNote = async (req, res) => {
    try {
      const id = req.params.id;
      const notes = await Note.findOne({ id });
      if (!notes) {
        return {
          message: "Note not found",
        };
      }
      handleResponse(
        req,
        res,
        {
          notes,
          message: "Note retrieved successfully!!!",
        },
        200
      );
    } catch (error) {
      handleResponse(
        req,
        res,
        { message: "An error occured, please try again!" },
        500
      );
    }
  };

  editNote = async (req, res) => {
    try {
      const id = req.params.id;
      const note = await Note.findByIdAndUpdate({ id }, req.body, {
        new: true,
      });
      if (!note) {
        return {
          message: "Note not found",
        };
      }

      handleResponse(
        req,
        res,
        { data: note, message: "Note updated successfully " },
        200
      );
    } catch (error) {
      handleResponse(
        req,
        res,
        { message: "An error occured, please try again!" },
        500
      );
    }
  };

  deleteNote = async (req, res) => {
    try {
      const id = req.params.id;
      const note = await Note.findByIdAndDelete({ id });
      if (!note) {
        return {
          message: "Note not found",
        };
      }

      handleResponse(req, res, { data: null, message: "Note deleted" }, 204);
    } catch (error) {
      handleResponse(
        req,
        res,
        { message: "An error occured, please try again!" },
        500
      );
    }
  };
}

module.exports = new NoteController();
