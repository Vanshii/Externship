import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faExternalLinkAlt, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

const Quizzes = ({ navigate }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: "", typeformLink: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }
    fetchQuizzes();
  }, [token, navigate]);

  // Fetch quizzes from backend with token authentication
  const fetchQuizzes = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/quizzes/all", {
        headers: { Authorization: `Bearer ${token}` }, // Send token
      })
      .then((res) => {
        setQuizzes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes. Please try again.");
        setIsLoading(false);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };

  // Add a new quiz with token authentication
  const addQuiz = () => {
    // Validate inputs
    if (!newQuiz.title.trim() || !newQuiz.typeformLink.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    axios
      .post("http://localhost:5000/quizzes/add", newQuiz, {
        headers: { Authorization: `Bearer ${token}` }, // Send token
      })
      .then((res) => {
        setQuizzes([...quizzes, res.data.quiz]);
        setNewQuiz({ title: "", typeformLink: "" });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error adding quiz:", err);
        setError("Failed to add quiz. Please try again.");
        setIsLoading(false);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };

  // Delete a quiz with token authentication
  const deleteQuiz = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      setIsLoading(true);
      axios
        .delete(`http://localhost:5000/quizzes/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token
        })
        .then(() => {
          setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error deleting quiz:", err);
          setError("Failed to delete quiz. Please try again.");
          setIsLoading(false);
          if (err.response && err.response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    }
  };

  return (
    <div className="container py-5">
      {/* Header with gradient background */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="bg-light p-4 rounded-3 shadow-sm">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-gradient text-white p-3 rounded-circle me-3">
                <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" />
              </div>
              <div>
                <h1 className="fw-bold mb-0">Manage Quizzes</h1>
                <p className="text-muted mb-0">Create and manage assessment quizzes for students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Quiz */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-white py-3">
              <h5 className="card-title fw-bold mb-0">Add New Quiz</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quiz Title"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Typeform Quiz Link"
                    value={newQuiz.typeformLink}
                    onChange={(e) => setNewQuiz({ ...newQuiz, typeformLink: e.target.value })}
                  />
                </div>
                <div className="col-md-2">
                  <button 
                    className="btn btn-primary w-100" 
                    onClick={addQuiz}
                    disabled={isLoading}
                    style={{
                      background: "linear-gradient(45deg, #1b76ff, #9c27b0)",
                      border: "none",
                      borderRadius: "50px"
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List of Quizzes */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="card-title fw-bold mb-0">All Quizzes</h5>
              <span className="badge bg-primary rounded-pill">
                {quizzes.length} {quizzes.length === 1 ? "Quiz" : "Quizzes"}
              </span>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading quizzes...</p>
                </div>
              ) : quizzes.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No quizzes available. Add your first quiz above!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" width="5%">#</th>
                        <th scope="col" width="40%">Quiz Title</th>
                        <th scope="col" width="40%">Quiz Link</th>
                        <th scope="col" width="15%" className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizzes.map((quiz, index) => (
                        <tr key={quiz._id}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{quiz.title}</strong>
                          </td>
                          <td>
                            <a 
                              href={quiz.typeformLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              {quiz.typeformLink.substring(0, 40)}
                              {quiz.typeformLink.length > 40 ? "..." : ""}
                              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2 text-muted small" />
                            </a>
                          </td>
                          <td className="text-end">
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => deleteQuiz(quiz._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;