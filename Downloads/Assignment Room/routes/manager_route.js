const express = require("express");
const managerController = require("../controller/manager_controller");

const router = express.Router();
router.get("/all_jobs", managerController.allJobs);
router.get("/create_job", managerController.createJobs);
router.get("/jobsByYou", managerController.jobsByYou);
router.get("/applications", managerController.applications);
router.get("/delete_application/", managerController.deleteApplication);
router.get("/edit_form/",managerController.editForm);
router.get("/profile",managerController.profile);
router.post("/profile/password",managerController.password);
router.post("/save_changes/",managerController.saveChanges);
router.post("/submit_form", managerController.submitForm);

module.exports = router;
