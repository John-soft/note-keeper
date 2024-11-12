const handleResponse = require("../helpers/response");
const Note = require("../models/Note");
class NoteController {
  createNote = async (req, res) => {
    try {
      const { title, content, folderId } = req.body;
      const note = await Note.create({
        title,
        content,
        user: req.user,
        folder: folderId,
      });
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

  searchNote = async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res
          .status(400)
          .json({ error: "Please provide a search query." });
      }

      const notes = await Note.find({
        user: req.user._id,
        title: { $regex: query, $options: "i" },
      });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  viewAllNotes = async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user._id })
        .populate("user", "name")
        .populate("folder", "name")
        .sort({ createdAt: -1 });
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
      const notes = await Note.findOne({ _id: id, user: req.user.id });
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
      //const { title, content } = req.body;
      const note = await Note.findOneAndUpdate(
        { _id: id, user: req.user },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!note) {
        return {
          message: "Note not found",
        };
      }

      handleResponse(
        req,
        res,
        { data: note, message: "Note updated successfully" },
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
      const note = await Note.findOneAndDelete({ _id: id, user: req.user });
      if (!note) {
        return {
          message: "Note not found",
        };
      }

      handleResponse(req, res, { data: null, message: "Note deleted" }, 200);
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
