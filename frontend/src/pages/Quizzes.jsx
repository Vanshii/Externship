import { useState, useEffect } from "react";
import axios from "axios";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: "", typeformLink: "" });

  // Fetch quizzes from backend
  useEffect(() => {
    axios.get("http://localhost:5000/quizzes/all")
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error("Error fetching quizzes:", err));
  }, []);

  // Add a new quiz
  const addQuiz = () => {
    axios.post("http://localhost:5000/quizzes/add", newQuiz)
      .then((res) => {
        setQuizzes([...quizzes, res.data.quiz]);
        setNewQuiz({ title: "", typeformLink: "" });
      })
      .catch((err) => console.error("Error adding quiz:", err));
  };

  // Delete a quiz
  const deleteQuiz = (id) => {
    axios.delete(`http://localhost:5000/quizzes/delete/${id}`)
      .then(() => setQuizzes(quizzes.filter((quiz) => quiz._id !== id)))
      .catch((err) => console.error("Error deleting quiz:", err));
  };

  return (
    <div>
      <h2>Manage Quizzes</h2>

      {/* Add New Quiz */}
      <div>
        <input
          type="text"
          placeholder="Quiz Title"
          value={newQuiz.title}
          onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Typeform Quiz Link"
          value={newQuiz.typeformLink}
          onChange={(e) => setNewQuiz({ ...newQuiz, typeformLink: e.target.value })}
        />
        <button onClick={addQuiz}>Add Quiz</button>
      </div>

      {/* List of Quizzes */}
      <div>
        <h3>All Quizzes</h3>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <strong>{quiz.title}</strong> - <a href={quiz.typeformLink} target="_blank" rel="noopener noreferrer">Open Quiz</a>
              <button onClick={() => deleteQuiz(quiz._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quizzes;
