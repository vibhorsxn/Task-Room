const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models").User;

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    function (req, username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) {
          req.flash("error", err)
          return done(err);
        }
        if (!user || password !== user.password) {
          req.flash("error", "Invalid Username or Password");
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    })
);

//serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding the user");
      return done(error);
    }
    return done(null, user);
  });
});

//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
