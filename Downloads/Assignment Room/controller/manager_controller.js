const Form = require("../models").Form;
const User = require("../models").User;

function checkManager(req) {
  if (req.user.role === "manager") {
    return true;
  } else {
    return false;
  }
}

module.exports.submitForm = function (req, res) {
  Form.create(req.body, function (err, form) {
    if (err) {
      req.flash("error", "Error in submitting the form");
      return;
    }
    req.flash("success", "Job is created")
    return res.redirect("/manager/jobsByYou");
  });
};

module.exports.allJobs = function (req, res) {
  if (checkManager(req)) {
    Form.find({}, function (err, project) {
      if (err) {
        console.log("Error in fetching data from the database");
        return;
      }
      return res.render("jobs", {
        project_list: project,
        layout: 'layoutA'
      });
    });
  } else {
    return res.redirect("back");
  }
};

module.exports.createJobs = function (req, res) {
  if (checkManager(req)) {
    return res.render("form", { layout: "layoutA" });
  } else {
    return res.redirect("back");
  }
};

module.exports.jobsByYou = function (req, res) {
  if (checkManager(req)) {
    Form.find({ manager: req.user.name }, function (err, jobs) {
      if (err) {
        console.log("Error in finding the jobs");
        return;
      }
      return res.render("myJobs", {
        project_list: jobs,
        layout: "layoutA"
      });
    });
  } else {
    return res.redirect("back");
  }
};

module.exports.applications = function (req, res) {
  if (checkManager(req)) {
    Form.find({ manager: req.user.name }, function (err, jobs) {
      if (err) {
        console.log("error in finding the jobs assign by you!");
        return;
      }
      if (!jobs) {
        console.log("You have not assigned any job till now!!");
        return res.redirect("/manager/all_jobs");
      }
      return res.render("applications", {
        job_list: jobs,
        layout: "layoutA"
      });
    });
  } else {
    return res.redirect("/");
  }
};

//Delete the form
module.exports.deleteApplication = function (req, res) {
  if (checkManager(req)) {
    Form.findById(req.query.id, function (err, form) {
      if (err) {
        req.flash("error", "Error in finding the Job");
        return;
      }
      else if (req.user.email !== form.manager_email) {
        req.flash("error", "You can't delete this Job");
        return res.redirect("/manager/jobsByYou");
      }
      else {
        form.remove();
        req.flash("success", "Job is deleted");
        return res.redirect("/manager/jobsByYou");
      }
    });
  }
  else {
    req.flash("error", "You can't delete this Job");
    return res.redirect("/");
  }
};

//Edit form
module.exports.editForm = function (req, res) {
  if (checkManager(req)) {
    Form.findById(req.query.id, function (err, form) {
      if (err) {
        console.log("Error in finding the form");
        return;
      }
      else if (req.user.email !== form.manager_email) {
        return res.redirect("/manager/jobsByYou");
      }
      else {
        return res.render("editForm", {
          formDetails: form,
          layout: "layoutA"
        });
      }
    })
  }
  else {
    return res.redirect("/");
  }

}

//Save the changes in form
module.exports.saveChanges = function (req, res) {
  if (checkManager(req)) {
    Form.findByIdAndUpdate(req.query.formId, req.body, function (err, updatedForm) {
      if (err) {
        req.flash("error", "Error in updating the form")
        return;
      }
      else {
        req.flash("success", "Form is Updated");
        return res.redirect("/manager/jobsByYou");
      }
    })
  }
  else {
    req.flash("error", "Error in updating the form");
    return res.redirect("/");
  }
}


//check Profile
module.exports.profile = function (req, res) {
  return res.render("profile");
}

//change password
module.exports.password = function (req, res) {
  if (req.body.password === req.body.confirmPassword) {
    User.findByIdAndUpdate(req.user._id, { password: req.body.password }, function (err, newPass) {
      if (err) {
        req.flash("error", "Error in updating password");
        return;
      }
      req.flash("success", "Your password has been changed");
      return res.redirect("back");
    })
  }
}


