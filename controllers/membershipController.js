const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.membership_get = asyncHandler(async (req, res, next) => {
  res.render("membership");
});

exports.membership_post = [
  body("passcode").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty() || req.body.passcode !== "password") {
      res.render("membership", {
        guess: false,
      });
      return;
    } else {
      const filter = { username: req.user.username };
      const update = { $set: { membership: true } };
      const options = { returnDocument: "After" };

      await User.findOneAndUpdate(filter, update, options);

      res.redirect("messages");
    }
  }),
];
