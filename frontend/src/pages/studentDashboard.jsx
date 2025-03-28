import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [loadingAssignments, setLoadingAssignments] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const getToken = () => localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/"); // Redirect to login
  };

  const fetchQuizzes = () => {
    setLoadingQuizzes(true);
    fetch("http://localhost:5000/quizzes/all", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data);
        setShowQuizzes(true);
      })
      .catch((error) => console.error("Error fetching quizzes:", error))
      .finally(() => setLoadingQuizzes(false));
  };

  const fetchAssignments = () => {
    setLoadingAssignments(true);
    fetch("http://localhost:5000/assignments/all", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAssignments(data);
        setShowAssignments(true);
      })
      .catch((error) => console.error("Error fetching assignments:", error))
      .finally(() => setLoadingAssignments(false));
  };

  const markAttendance = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const attendanceData = {
      studentEmail: email,
      date: selectedDate,
      status: "Present",
    };

    fetch("http://localhost:5000/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(attendanceData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Attendance marked:", data);
        setAttendanceMarked(true);
      })
      .catch((error) => console.error("Error marking attendance:", error));
  };

  return (
    <div className="container mt-4">
      {/* Logout Button */}
      <div className="d-flex justify-content-between">
        <h1 className="text-center">Welcome Student</h1>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={fetchAssignments}>
          {loadingAssignments ? "Loading..." : "View Assignments"}
        </button>
        <button className="btn btn-secondary" onClick={fetchQuizzes}>
          {loadingQuizzes ? "Loading..." : "View Quizzes"}
        </button>
      </div>

      {/* Attendance Section */}
      <div className="card p-4 shadow-sm mb-4">
        <h2 className="text-center">Mark Attendance</h2>
        <div className="d-flex flex-column align-items-center gap-2">
          <input
            type="email"
            className="form-control w-50"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="date"
            className="form-control w-50"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            max={new Date().toISOString().split("T")[0]}
            disabled
          />
          <button className="btn btn-success" onClick={markAttendance} disabled={attendanceMarked}>
            {attendanceMarked ? "Attendance Marked ✅" : "Mark Present"}
          </button>
        </div>
        {attendanceMarked && <p className="text-success text-center mt-2">Attendance marked successfully! ✅</p>}
      </div>

      {/* Display Quizzes */}
      {showQuizzes && (
        <div className="card p-4 shadow-sm mb-4">
          <h2 className="text-center">Available Quizzes</h2>
          <ul className="list-group">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>{quiz.title}</strong>
                  <a href={quiz.typeformLink} target="_blank" rel="noopener noreferrer" className="btn btn-link">Take Quiz</a>
                </li>
              ))
            ) : (
              <p className="text-center">No quizzes available</p>
            )}
          </ul>
        </div>
      )}

      {/* Display Assignments */}
      {showAssignments && (
        <div className="card p-4 shadow-sm">
          <h2 className="text-center">Available Assignments</h2>
          <ul className="list-group">
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <li key={assignment._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>{assignment.title}</strong>
                  <a href={assignment.link} target="_blank" rel="noopener noreferrer" className="btn btn-link">View Assignment</a>
                </li>
              ))
            ) : (
              <p className="text-center">No assignments available</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
