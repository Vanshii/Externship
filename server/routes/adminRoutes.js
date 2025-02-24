const express = require("express");
const { adminSignup, adminLogin } = require("../controllers/adminController");
// const { markAttendance } = require("../controllers/adminMarkAttendance");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
// router.post("/mark-attendance", markAttendance);

module.exports = router;
