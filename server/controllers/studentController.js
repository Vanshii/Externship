const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JWT_SECRET;

// Student Signup
const studentSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingStudent = await Student.findOne({ email });
        console.log("Existing Student Found:", existingStudent);

        if (existingStudent) {
            return res.status(400).json({ message: "Student already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({ username, email, password: hashedPassword }); // ✅ Include username
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Student Login
const studentLogin = async (req, res) => {
    console.log("Student Login Request:", req.body);
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student || !(await bcrypt.compare(password, student.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email, role: "student" }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
};

module.exports = { studentSignup, studentLogin };
