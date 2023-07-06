const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required. Please fill in the name."],
      trim: true,
      minlength: [
        3,
        "The length of the name should be a minimum of 3 characters.",
      ],
      maxlength: [
        31,
        "The length of the name should be a maximum of 31 characters.",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required. Please fill in the email."],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => {
          const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          return emailRegex.test(v);
        },
        message: "Email validation failed.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "The password should be a minimum of 6 characters."],
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    todos: [
      {
        text: {
          type: String,
          required: true,
        },
        complete: {
          type: Boolean,
          default: false,
        },
        timestamp: {
          type: String,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
