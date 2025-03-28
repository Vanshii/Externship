import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const navigate = useNavigate(); // For redirection

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/${role}/signup`, // Adjust API route
        { username, email, password }
      );
      alert(res.data.message);
      navigate("/login"); // Redirect to login after signup
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Create Account</h2>
        
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" placeholder="Enter username" value={username} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              {/* <option value="student">Student</option> */}
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        
        <p className="mt-3 text-center">
          Already have an account? <a href="/login" className="text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
