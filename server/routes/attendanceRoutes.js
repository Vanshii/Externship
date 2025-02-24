const express = require("express");
const Attendance = require("../models/Attendance");
const router = express.Router();


router.get("/all", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find(); // Fetch all attendance records
    res.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance:", error.message); // Log error message
    res.status(500).json({ message: error.message }); // Send actual error message
  }
});

// POST: Mark Attendance
router.post("/", async (req, res) => {
  try {
    const { studentEmail, date, status } = req.body;

    if (!studentEmail || !date) {
      return res.status(400).json({ message: "Email and date are required" });
    }

    const attendance = new Attendance({ studentEmail, date, status });
    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET: View all attendance records
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
