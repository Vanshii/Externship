import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [email, setEmail] = useState(""); // Added email input state
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  useEffect(() => {
    // Uncomment if authentication is needed
    // const storedUser = localStorage.getItem("user");
    // if (!storedUser) {
    //   navigate("/");
    //   return;
    // }
  }, [navigate]);

  // Fetch quizzes
  const fetchQuizzes = () => {
    fetch("http://localhost:5000/quizzes/all") // Adjust URL
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data);
        setShowQuizzes(true);
      })
      .catch((error) => console.error("Error fetching quizzes:", error));
  };

  // Mark Attendance
  const markAttendance = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const attendanceData = {
      studentEmail: email, // Use email instead of hardcoded student ID
      date: selectedDate,
      status: "Present",
    };

    fetch("http://localhost:5000/attendance", { // Adjust URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    <div>
      <h1>Welcome Student</h1>

      {/* Navigation Buttons */}
      <button onClick={() => navigate("/student/assignments")}>View Assignments</button>
      <button onClick={fetchQuizzes}>View Quizzes</button>

      {/* Attendance Section */}
      <div>
        <h2>Mark Attendance</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={markAttendance}>Mark Present</button>
        {attendanceMarked && <p>Attendance marked successfully! ✅</p>}
      </div>

      {/* Display Quizzes */}
      {showQuizzes && (
        <div>
          <h2>Available Quizzes</h2>
          <ul>
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <li key={quiz._id}>
                  <strong>{quiz.title}</strong> - 
                  <a href={quiz.typeformLink} target="_blank" rel="noopener noreferrer"> Take Quiz</a>
                </li>
              ))
            ) : (
              <p>No quizzes available</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
