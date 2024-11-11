const { Schema, model } = require("mongoose");
const folderSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Folder", folderSchema);
