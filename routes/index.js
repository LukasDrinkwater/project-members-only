var express = require("express");
var router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// SIGN UP ROUTES

router.get("/sign-up", user_controller.user_sign_up_get);

router.post("/sign-up", user_controller.user_sign_up_post);

// LOGIN ROUTES

// MESSAGE ROUTES

router.get("/messages", message_controller.message_list);

module.exports = router;
