exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

exports.checkMembership = (req, res, next) => {
  console.log(req.user.membership);
  if (req.user.membership === false) {
    return res.redirect("/membership");
  }
  next();
};
