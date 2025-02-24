import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import StudentDashboard from "./pages/studentDashboard";
import Attendance from "./pages/attendance";
// import Dashboard from "./pages/dashboard";
import Quizzes from "./pages/Quizzes";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        {/* {user?.role === "admin" ? (
          <Route path="/dashboard" element={<AdminDashboard />} />
        ) : (
          <Route path="/dashboard" element={<StudentDashboard />} />
        )} */}
        <Route path="quizzes" element={<Quizzes />} />
      </Routes>
    </Router>
  );
}

export default App;
