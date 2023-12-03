const passport = require("passport");
const initialisePassport = require("../strategies/passport-config");
const LocalStrategy = require("passport-local").Strategy;
const bycrpt = require("bcryptjs");

const User = require("../models/user");

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// User log in GET

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("login");
});

// User log in POST

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bycrpt.compare(password, user.password);
      if (!match) {
        // passwords dont match
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

exports.user_login_post = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/login",
  })(req, res, next); // Invoke authentication middleware here

  // You should not send the response here, as it will be sent by the authentication middleware
  // res.send(200);
});
