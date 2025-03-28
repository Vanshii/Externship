const express = require("express");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");

const router = express.Router();

// Add Student
router.post("/add-student", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password || "default123", 10);

    // Create new student
    const newStudent = new Student({
      username,
      email,
      password: hashedPassword,
      role: "student",
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// View All Students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 }); // Exclude password
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete Student
router.delete("/delete-student/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
