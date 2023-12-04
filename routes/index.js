var express = require("express");
var router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");
const login_controller = require("../controllers/loginController");

// HELPER FUNCTIONS
const authentication = require("../strategies/authentication");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// SIGN UP ROUTES

router.get(
  "/sign-up",
  authentication.checkAuthenticated,
  user_controller.user_sign_up_get
);

router.post("/sign-up", user_controller.user_sign_up_post);

// LOGIN ROUTES

router.get(
  "/login",
  authentication.checkNotAuthenticated,
  login_controller.user_login_get
);

router.post(
  "/login",
  authentication.checkNotAuthenticated,
  login_controller.user_login_post
);

// LOGOUT

router.post("/logout", login_controller.user_logout_delete);

// MESSAGE ROUTES

router.get(
  "/messages",
  authentication.checkAuthenticated,
  message_controller.message_list
);

router.post("/messages", message_controller.message_add_post);

module.exports = router;
