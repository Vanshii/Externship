const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
 typeformLink: { type: String, required: true }
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
