const { Schema, model } = require("mongoose");
const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
      virtuals: true,
    },
  }
);

// folderSchema.virtual("notes", {
//   ref: "Note",
//   localField: "_id",
//   foreignField: "folder",
// });

module.exports = model("Folder", folderSchema);
