const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// ✅ Add a new quiz
router.post("/add", async (req, res) => {
  try {
    const { title, typeformLink } = req.body;
    if (!title || !typeformLink) {
      return res.status(400).json({ error: "Title and Typeform link are required" });
    }
    
    const newQuiz = new Quiz({ title, typeformLink });
    await newQuiz.save();
    
    res.status(201).json({ message: "Quiz added successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get all quizzes
router.get("/all", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete a quiz by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
