const User = require("../models").User;

//render sign in page
module.exports.signIn = function (req, res) {
  return res.render("signIn", { layout: false });
};

//render sign up page
module.exports.signUp = function (req, res) {
  return res.render("signUp", {
    role: "employee",
    layout: false
  });
};

//create new user account
module.exports.createAccount = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, newuser) {
        if (err) {
          console.log("Error in creating the user");
          return;
        }
        return res.redirect("/");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//Authenticate user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged In successfully!");
  if (req.user.role === "manager") {
    return res.redirect("/manager/all_jobs");
  } else if (req.user.role === "employee") {
    return res.redirect("/employee/alljobs");
  }
  else if (req.user.role === "admin") {
    return res.redirect("/admin/create_manager_acc");
  }
};

//destroy the session
module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "Logged Out successfully!");
  return res.redirect("/");
};
