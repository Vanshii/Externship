const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensuring uniqueness
    password: { type: String, required: true },
    role: { type: String, default: "student" } // Default role as "student"
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
