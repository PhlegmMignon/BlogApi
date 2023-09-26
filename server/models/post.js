const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: 2,
    maxLength: 30,
  },
  content: {
    type: String,
    require: [true, "Content is required"],
    minLength: 1,
    maxLength: 500,
  },
  date_created: { type: Date, default: Date.now() },
  published: { type: Boolean, required: true, default: true },
});

PostSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
