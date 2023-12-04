const passport = require("passport");
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

exports.user_login_post = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/login",
  })(req, res, next); // Invoke authentication middleware here

  // You should not send the response here, as it will be sent by the authentication middleware
  // res.send(200);
});

// User logout
exports.user_logout_delete = asyncHandler(async (req, res, next) => {
  req.logOut(function (error) {
    if (error) {
      return next(error);
    }
    res.redirect("/login");
  });
});
