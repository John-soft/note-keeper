const { Schema, model } = require("mongoose");

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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folder: {
      type: Schema.Types.ObjectId,
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
