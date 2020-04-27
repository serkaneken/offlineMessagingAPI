const mongoose = require("mongoose");
const hashPassword = require("../helpers/hashPassword");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  if (this.password) {
    this.password = hashPassword(this.password);
  }
  next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
