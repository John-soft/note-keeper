const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Anonymous User",
      //required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: 8,
      select: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    accessToken: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.password;
      },
    },
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
