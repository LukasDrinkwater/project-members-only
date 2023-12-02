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
  body("username", "You must have a username").trim().isLength({ min: 1 })
    .escape,
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters")
    .escape(),
  body("confirmpassword")
    .trim()
    .isLength({ min: 5 })
    .custom((confirmPassword, { req }) => {
      return confirmPassword === req.body.password;
    })
    .escape(),

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
        first_name: "1",
        last_name: "1",
        username: req.body.username,
        password: req.body.password,
        membership: true,
      });

      await newUser.save();

      res.redirect("/messages");
    }
  }),
];
