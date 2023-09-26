const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, trim: true, lowercase: true },
  password: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
