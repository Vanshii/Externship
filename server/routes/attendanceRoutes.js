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

// router.get("/date", async (req, res) => {
//   try {
//     const { date } = req.query; // Get date from query parameters
//     if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//     }

//     // Convert the date string (YYYY-MM-DD) to a proper Date object
//     const startDate = new Date(date);
//     const endDate = new Date(date);
//     endDate.setDate(endDate.getDate() + 1); // Move to the next day to cover full range

//     const attendanceRecords = await Attendance.find({
//       date: { $gte: startDate, $lt: endDate } // Find records for the specific date
//     });

//     res.json(attendanceRecords);
//   } catch (error) {
//     console.error("Error fetching attendance by date:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// });
router.get("/date", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    console.log("Searching for date:", date); // Debugging log

    // Query using exact string match since 'date' is stored as a string
    const attendanceRecords = await Attendance.find({ date });

    console.log("Found records:", attendanceRecords); // Debugging log

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance records found for the selected date." });
    }

    res.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance by date:", error.message);
    res.status(500).json({ message: error.message });
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
