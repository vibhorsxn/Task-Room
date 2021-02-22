const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin_controller");

router.get("/create_manager_acc",adminController.createManagerAcc);

module.exports = router;