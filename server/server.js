require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
// import quizRoutes from "./routes/quizRoutes";
const quizRoutes = require("./routes/quizRoutes");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/quizzes", quizRoutes);
app.use("/attendance", require("./routes/attendanceRoutes"));
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
