import { useState, useEffect } from "react";

const Attendance = ({ navigate }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = () => {
    fetch("http://localhost:5000/attendance/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setAttendanceRecords([]);
          setError(data.message);
        } else {
          setAttendanceRecords(data);
          setError("");
        }
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
        setError("Error fetching attendance.");
      });
  };

  return (
    <div>
      <h2>Attendance</h2>
      <p>Manage student attendance records.</p>
      <button onClick={() => navigate("/attendance")}>View Attendance</button>

      {/* Display Attendance Records */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {attendanceRecords.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Student Email</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.studentEmail}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
};

export default Attendance;
