var express = require("express");
var router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");
const login_controller = require("../controllers/loginController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// SIGN UP ROUTES

router.get("/sign-up", user_controller.user_sign_up_get);

router.post("/sign-up", user_controller.user_sign_up_post);

// LOGIN ROUTES

router.get("/login", login_controller.user_login_get);

router.post("/login", login_controller.user_login_post);
// MESSAGE ROUTES

router.get("/messages", message_controller.message_list);

module.exports = router;
