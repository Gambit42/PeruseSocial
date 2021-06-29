const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide a username."],
    unique: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },

  image: {
    type: String,
    required: false,
  },
  books: [
    {
      bookImage: {
        type: String,
        required: false,
      },
      bookTitle: {
        type: String,
        required: true,
      },
      bookThoughts: {
        type: String,
        required: true,
      },
      dateCreated: {
        type: Date,
        default: () => {
          return new Date();
        },
      },
    },
  ],
});

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userModel.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", userModel);
