const Form = require("../models").Form;
const User = require("../models").User;

function checkEmployee(req) {
  if (req.user.role === "employee") {
    return true;
  } else {
    return false;
  }
}

module.exports.allJobs = function (req, res) {
  if (checkEmployee(req)) {
    Form.find({}, function (err, jobs) {
      if (err) {
        console.log("Error in finding the user");
        return;
      }
      return res.render("emp", {
        project_list: jobs,
        layout: "layoutB"
      });
    });
  } else {
    return res.redirect("back");
  }
};

module.exports.apply = function (req, res) {
  if (checkEmployee(req)) {
    let applicant = { name: req.user.name, email: req.user.email };
    Form.findOneAndUpdate(
      { assignment_name: req.query.job },
      { $push: { applicants: applicant } },
      function (err, success) {
        if (err) {
          console.log(err);
        } else {
          console.log(success)
        }
      }
    );
    return res.redirect("/employee/alljobs");
  }
  req.flash("error", "You can't apply to this Job");
  return res.redirect("/");
};

//check Profile
module.exports.profile = function (req, res) {
  return res.render("profile", { layout: "layoutB" });
};

//change password
module.exports.password = function (req, res) {
  if (req.body.password === req.body.confirmPassword) {
    User.findByIdAndUpdate(
      req.user._id,
      { password: req.body.password },
      function (err, newPass) {
        if (err) {
          req.flash("error", "Error in updating password");
          return;
        }
        req.flash("success", "Your password has been changed successfully!");
        return res.redirect("back");
      }
    );
  }
};

// Add Favourite
module.exports.addFav = function (req, res) {
  Form.findByIdAndUpdate(
    req.params.id,
    { $push: { user_fav: req.user._id } },
    function (err, form) {
      if (err) {
        req.flash("error", "Some error has occured");
        return;
      }
      req.flash("success", "This Job is added to Favourites");
      return res.redirect("back");
    }
  );
};

//Remove From Fav
module.exports.unFav = function (req, res) {
  Form.findByIdAndUpdate(
    req.params.id,
    { $pull: { user_fav: req.user._id } },
    function (err, form) {
      if (err) {
        req.flash("error", "Some error has occured");
        return;
      }
      req.flash("success", "This Job is removed from Favourites");
      return res.redirect("back");
    }
  );
};

// Add Filter
module.exports.filter = function (req, res) {
  let job = req.body.job;
  if (job === "all jobs") {
    return res.redirect("/employee/alljobs");
  }
  if (job === "favourites") {
    Form.find({ user_fav: req.user._id }, function (err, jobs) {
      if (err) {
        console.log("Error in finding the user");
        return;
      }
      return res.render("emp", {
        project_list: jobs,
        layout: "layoutB"
      });
    });
  }
  if (job === "applied jobs") {
    Form.find({ "applicants.email": req.user.email }, function (err, jobs) {
      if (err) {
        console.log("Error in finding the user");
        return;
      }
      return res.render("emp", {
        project_list: jobs,
        layout: "layoutB"
      });
    });
  }
};
