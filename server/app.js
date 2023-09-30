var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const User = require("./models/user");

//Saves user session
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect user/pass" });
      }
      console.log(user.password + " " + password);
      const match = user.password == password ? true : false;
      if (!match) {
        return done(null, false, { message: "Incorrect user/pass" });
      }
      console.log("validated");
      return done(null, user);
    } catch (err) {
      console.log("err encounter");
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("serialized");
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    console.log("deserialized");

    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

var app = express();
app.use(cors());
//Connects to mongodb
mongoose.set("strictQuery", false);
const mongoDB = process.env.BLOG_API_KEY;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

//Routes for making/deleting messages, comments

//Authenticating so I'm the only person who can make posts
//Log in form

//Author client
//Form route
//Form for author to publish
//Author can make comments too

//Viewer client
//Displays posts
//Allows comments on posts
