const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JWT_SECRET;

// Admin Signup
const adminSignup = async (req, res) => {
    try {
        const {username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        console.log("Existing Admin Found:", existingAdmin);

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({username, email, password: hashedPassword }); // ✅ Include username
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



// Admin Login
const adminLogin = async (req, res) => {
    console.log("Admin Login Request:", req.body);
    const {email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email, role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
};

module.exports = { adminSignup, adminLogin };
