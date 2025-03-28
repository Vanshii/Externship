import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: "", link: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/assignments/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setAssignments(res.data))
      .catch((err) => {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments.");
      });
  }, [navigate]);

  const addAssignment = () => {
    const token = localStorage.getItem("token");

    axios.post("http://localhost:5000/assignments/add", newAssignment, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setAssignments([...assignments, res.data.assignment]);
        setNewAssignment({ title: "", link: "" });
      })
      .catch((err) => {
        console.error("Error adding assignment:", err);
        setError("Failed to add assignment.");
      });
  };

  const deleteAssignment = (id) => {
    const token = localStorage.getItem("token");

    axios.delete(`http://localhost:5000/assignments/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setAssignments(assignments.filter((assignment) => assignment._id !== id)))
      .catch((err) => {
        console.error("Error deleting assignment:", err);
        setError("Failed to delete assignment.");
      });
  };

  return (
    <div>
      <h2>Manage Assignments</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add New Assignment */}
      <div>
        <input
          type="text"
          placeholder="Assignment Title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Assignment Link"
          value={newAssignment.link}
          onChange={(e) => setNewAssignment({ ...newAssignment, link: e.target.value })}
        />
        <button onClick={addAssignment}>Add Assignment</button>
      </div>

      {/* List of Assignments */}
      <div>
        <h3>All Assignments</h3>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment._id}>
              <strong>{assignment.title}</strong> - <a href={assignment.link} target="_blank" rel="noopener noreferrer">View Assignment</a>
              <button onClick={() => deleteAssignment(assignment._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Assignments;
