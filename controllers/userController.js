const User = require("../models/user");

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// User sign up GET
exports.user_sign_up_get = asyncHandler(async (req, res, next) => {
  console.log("here");
  res.render("sign_up");
});

// exports.user_sign_up_post = asyncHandler(async (res, req, next) => {
//   res.send("text");
// });

// User sign up POST
exports.user_sign_up_post = [
  // console.log("here"),
  body("firstName", "You must have a first name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "You must have a last name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Username must be a valid email address.")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters")
    .escape(),
  body("confirmPassword")
    .trim()
    .isLength({ min: 5 })
    .custom((confirmPassword, { req }) => {
      return confirmPassword === req.body.password;
    })
    .escape(),
  // body("membership")
  //   .isBoolean()
  //   .withMessage("Membership status must be selected")
  //   .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("sign_up", {
        errors: errors,
      });
      return;
    } else {
      console.log("here");

      // make new user
      const newUser = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        membership: req.body.membership,
      });
      console.log("here");

      await newUser.save();

      res.redirect("/messages");
    }
  }),
];
