const express = require("express");

const router = express.Router();

const empController = require("../controller/emp_controller");

router.get("/alljobs", empController.allJobs);
router.get("/alljobs/add_favourite/:id", empController.addFav);
router.get("/alljobs/unfavourite/:id", empController.unFav);
router.get("/apply/", empController.apply);
router.get("/profile", empController.profile);
router.post("/profile/password", empController.password);

// Filter Route
router.post("/alljobs/filter", empController.filter);

module.exports = router;
