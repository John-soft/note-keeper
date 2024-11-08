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
}

module.exports = new NoteController();
