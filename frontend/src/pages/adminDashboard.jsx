import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Attendance from "./Attendance";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Example useEffect to check user session or permissions
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       // Redirect to login if no user is found
//       navigate("/login");
//     }
//   }, [navigate]);

  const Attendance = () => {
    return (
      <div>
        <h2>Attendance</h2>
        <p>Manage student attendance records.</p>
        <button onClick={() => navigate("/attendance")}>
          View Attendance
        </button>
      </div>
    );
  };

  const Quizzes = () => {
    return (
      <div>
        <h2>Quizzes</h2>
        <p>Create and manage quizzes.</p>
        <button onClick={() => navigate("/quizzes")}>View Quizzes</button>
      </div>
    );
  };
  

  const Assignments = () => {
    return (
      <div>
        <h2>Assignments</h2>
        <p>Manage student assignments.</p>
        <button onClick={() => alert("Manage Assignments Functionality Coming Soon!")}>
          View Assignments
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      <header>
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li onClick={() => navigate("/attendance")}>Attendance</li>
            <li onClick={() => navigate("/quizzes")}>Quizzes</li>
            <li onClick={() => navigate("/assignments")}>Assignments</li>
          </ul>
        </nav>
      </header>

      <main>
        <Attendance />
        <Quizzes />
        <Assignments />
      </main>

      <footer>
        <p>&copy; 2025 Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
