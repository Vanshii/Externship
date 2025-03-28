import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import StudentDashboard from "./pages/studentDashboard";
import Attendance from "./pages/attendance";
import "bootstrap/dist/css/bootstrap.min.css";
import AddStudent from "./pages/AddStudent";
import Assignment from "./pages/Assignment";

// import Dashboard from "./pages/dashboard";
import Quizzes from "./pages/Quizzes";
// import Assignment from "../../server/models/Assignment";

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
        <Route path="add-student" element={<AddStudent />} />
        {/* {user?.role === "admin" ? (
          <Route path="/dashboard" element={<AdminDashboard />} />
        ) : (
          <Route path="/dashboard" element={<StudentDashboard />} />
        )} */}
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/assignments" element={<Assignment />} />
      </Routes>
    </Router>
  );
}

export default App;
