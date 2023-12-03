// const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport");
// const bcrypt = require("bcryptjs");

// const User = require("../models/user");

// // passport.use(new LocalStrategy(async (username, password, done) => {}));

// function initialise(passport, getUserByEmail, getUserById) {
//   authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email);
//     if (user == null) {
//       return done(null, false, { message: "No user with that email" });
//     }

//     try {
//       if (bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "Password incorrect" });
//       }
//     } catch (error) {
//       return done(error);
//     }
//   };

//   // passport.use(
//   //   new LocalStrategy({ usernameField: "username" }, authenticateUser)
//   // );

//   passport.use(
//     new LocalStrategy(async (username, password, done) => {
//       try {
//         const user = await User.findOne({ username: username });
//         if (!user) {
//           return done(null, false, { message: "Incorrect username" });
//         }
//         const match = await bycrpt.compare(password.user.password);
//         if (!match) {
//           // passwords dont match
//           return done(null, false, { message: "Incorrect password" });
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     })
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     // return done(null, getUserById(id));
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   });
// }

// module.exports = initialise;
