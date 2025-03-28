import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === "student") {
      navigate("/login");
    } else if (role === "admin") {
      navigate("/signup");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My App</h1>
      <p>Select your role:</p>
      <button
        onClick={() => handleSelection("student")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Student
      </button>
      <button
        onClick={() => handleSelection("admin")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Admin
      </button>
    </div>
  );
};

export default Home;
