const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  date_created: { type: Date, default: Date.now() },
  content: {
    type: String,
    minLength: 1,
    maxLength: 200,
    required: [true, "Content is required"],
  },
});

CommentSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);
