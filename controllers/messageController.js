const Message = require("../models/message");

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.message_list = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find()
    .populate("user")
    .sort({ createdAt: 1 })
    .exec();

  console.log(req.user);

  res.render("message_board", {
    message_list: allMessages,
  });
});

// POST submit new message
exports.message_add_post = [
  body("message").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newMessage = new Message({
      user: req.user,
      message: req.body.message,
    });

    if (!errors.isEmpty()) {
      const allMessages = await Message.find()
        .populate("user")
        .sort({ createdAt: 1 })
        .exec();

      res.render("message_board", {
        message_list: allMessages,
        errors: errors.array(),
      });
      return;
    } else {
      await newMessage.save();

      res.redirect("/messages");
    }
  }),
];
