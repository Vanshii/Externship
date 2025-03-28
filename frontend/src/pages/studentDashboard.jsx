import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [loadingAssignments, setLoadingAssignments] = useState(false);


  const styles = {
    container: {
      backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/graph-paper-bg.png')",
      backgroundSize: "cover",
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      padding: "20px",
    },
  };
  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const getToken = () => localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <span className="h3 mb-0 text-primary">externship.life</span>
          </div>
          <div>
            <span className="me-3 text-muted"></span>
            <button 
              onClick={handleLogout} 
              className="btn btn-outline-secondary"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Updates Banner */}
        {/* <div className="alert alert-warning text-center" role="alert">
          <strong>Updates:</strong> Second Cohort Starts On March
        </div> */}

        {/* Page Title */}
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2">Student Dashboard</h1>
          <p className="lead text-muted">Manage your quizzes, assignments, and attendance.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="row g-4">
          {/* Attendance Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title h4 mb-3">Attendance</h2>
                <p className="card-text text-muted mb-3">Mark your daily attendance</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control mb-2"
                  />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="form-control mb-2"
                    disabled
                  />
                  <button 
                    onClick={markAttendance}
                    disabled={attendanceMarked}
                    className="btn btn-primary w-100"
                  >
                    {attendanceMarked ? "Attendance Marked" : "Mark Present"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quizzes Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title h4 mb-3">Quizzes</h2>
                <p className="card-text text-muted mb-3">Skill assessment quizzes</p>
                <button 
                  onClick={fetchQuizzes}
                  className="btn btn-primary w-100 mb-3"
                >
                  {loadingQuizzes ? "Loading..." : "View Quizzes"}
                </button>
                {quizzes.length > 0 && (
                  <div className="list-group">
                    {quizzes.map((quiz) => (
                      <div 
                        key={quiz._id} 
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        <span>{quiz.title}</span>
                        <a 
                          href={quiz.typeformLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-sm btn-outline-primary"
                        >
                          Take Quiz
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Assignments Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title h4 mb-3">Assignments</h2>
                <p className="card-text text-muted mb-3">Hands-on industry readiness assignments</p>
                <button 
                  onClick={fetchAssignments}
                  className="btn btn-primary w-100 mb-3"
                >
                  {loadingAssignments ? "Loading..." : "View Assignments"}
                </button>
                {assignments.length > 0 && (
                  <div className="list-group">
                    {assignments.map((assignment) => (
                      <div 
                        key={assignment._id} 
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        <span>{assignment.title}</span>
                        <a 
                          href={assignment.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Assignment
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;