const { Schema, model } = require("mongoose");
const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Folder", folderSchema);
