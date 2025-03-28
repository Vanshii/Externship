const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// ✅ Add a new assignment
router.post("/add", async (req, res) => {
  try {
    const { title, link } = req.body;
    if (!title || !link) {
      return res.status(400).json({ error: "Title and link are required" });
    }
    
    const newAssignment = new Assignment({ title, link });
    await newAssignment.save();
    
    res.status(201).json({ message: "Assignment added successfully", assignment: newAssignment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get all assignments
router.get("/all", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete an assignment by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
