import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import "bootstrap/dist/css/bootstrap.min.css";

const AddStudent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem("token");
  console.log(token);

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch students with token authentication
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      alert("Session expired. Please log in again.");
      handleLogout();
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Add student with token
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/add-student",
        { username, email, role: "student" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setUsername("");
      setEmail("");
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add student");
    }
  };

  // Delete student with token
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete-student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
    } catch (err) {
      alert("Failed to delete student");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow-lg p-4">
            <h2 className="text-center">Add Student</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-row gap-3 align-items-center">
              <div className="mb-3 flex-grow-1">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter student username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 flex-grow-1">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter student email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Student</button>
            </form>
          </div>
        </div>
      </div>

      <div className="row mt-5 justify-content-center">
        <div className="col-md-10">
          <h3 className="text-center">Students List</h3>
          <table className="table table-bordered table-striped text-center">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
