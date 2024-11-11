const handleResponse = require("../helpers/response");
const Folder = require("../models/Folder");

class FolderController {
  createFolder = async (req, res) => {
    try {
      const { name } = req.body;
      const folder = await Folder.create({ name, user: req.user });
      handleResponse(
        req,
        res,
        { data: folder, message: "Folder created" },
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
  getFolders = async (req, res) => {
    try {
      const folders = await Folder.find({ user: req.user }).populate("notes");
      res.json(folders);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  getFolder = async (req, res) => {
    try {
      const folder = await Folder.findOne({
        _id: req.params.id,
        user: req.user,
      });
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      res.json(folder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  updateFolder = async (req, res) => {
    try {
      const folder = await Folder.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
      );
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      res.json(folder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  deleteFolder = async (req, res) => {
    try {
      const folder = await Folder.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      res.json({ message: "Folder deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
}

module.exports = new FolderController();
