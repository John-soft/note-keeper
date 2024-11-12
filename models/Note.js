const { Schema, model, Types } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    createdAt: { type: Date, default: Date.now() },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    folder: {
      type: Types.ObjectId,
      ref: "Folder",
    },
  },
  {
    toObject: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

module.exports = model("Note", noteSchema);
