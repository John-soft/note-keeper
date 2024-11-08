const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    date: { type: Date, default: Date.now() },
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
