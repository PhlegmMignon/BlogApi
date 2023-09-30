var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Get login page
// router.get('/login', )

//Post to login

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/posts");
});

//Get list of posts
router.get(
  "/posts",
  asyncHandler(async function (req, res) {
    let posts = await Post.find().sort({ date_created: 1 }).exec();

    return res.json(posts);
  })
);

//Add new post
router.post("/posts", [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("content").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({});
  }),
]);

//Get specific post
router.get("/posts/:id", [
  body("title"),
  body("content"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: "Post 1",
      content: "test content",
      published: false,
    });

    if (!errors.isEmpty()) {
      //return error code
      return;
    } else {
      await post.save();
      res.redirect(200, "/posts");
    }
  }),
]);

//Update specific post

//Delete specific post

module.exports = router;
