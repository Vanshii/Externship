const express = require("express");
const { studentLogin } = require("../controllers/studentController");
const { studentSignup } = require("../controllers/studentController");

const router = express.Router();
router.post("/signup", studentSignup);
router.post("/login", studentLogin);

module.exports = router;
