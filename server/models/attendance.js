const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true }, // Identifies the student
  date: { type: String, required: true }, // Store date as YYYY-MM-DD
  status: { type: String, enum: ["Present", "Absent"], required: true }, // Attendance status
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
