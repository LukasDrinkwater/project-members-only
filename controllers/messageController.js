const Message = require("../models/message");

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.message_list = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find()
    .populate("user")
    .sort({ createdAt: 1 })
    .exec();

  res.render("message_board", {
    message_list: allMessages,
  });
});
