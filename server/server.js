require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
// import quizRoutes from "./routes/quizRoutes";
const quizRoutes = require("./routes/quizRoutes");
const addStudent = require("./routes/addstudent");
const verifyToken = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/auth");
const router = express.Router();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


const upload = uploadToS3("micro_content_videos");

// Upload API
app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ message: "File uploaded successfully!", fileUrl: req.file.location });
});

// Routes
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/quizzes", quizRoutes);
app.use("/assignments", require("./routes/assignment"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/admin", require("./routes/addstudent"));
app.use("/auth", authRoutes);
// app.get("/attendance/all", async (req, res) => {
//     try {
//       const attendanceRecords = await Attendance.find(); // Fetch all attendance records from MongoDB
//       res.json(attendanceRecords);
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   });
  

// Start Server


// router.get("/auth/verify", verifyToken, (req, res) => {
//   console
//     res.json({ message: "Token is valid", user: req.user });
//   });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
