const express = require("express");

const router = express.Router();

const passport = require("passport");

const homeController = require("../controller/home");

router.get("/", homeController.signIn);
router.get("/signUp", homeController.signUp);
router.get("/logout", homeController.destroySession);
router.post("/create_account", homeController.createAccount);

//use passport as a middleware to authenticate
router.post(
  "/authenticate_user",
  passport.authenticate("local", { failureRedirect: "/" }),
  homeController.createSession
);

router.use("/manager", passport.checkAuthentication, require("./manager_route"));
router.use("/employee", passport.checkAuthentication, require("./emp_route"));
router.use("/admin", passport.checkAuthentication, require("./admin_route"));

module.exports = router;
