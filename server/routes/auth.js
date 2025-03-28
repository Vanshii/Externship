const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware"); // Ensure correct path to middleware

router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

module.exports = router;
