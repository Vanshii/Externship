import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Custom CSS to match Externship.life style
const styles = {
  container: {
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/graph-paper-bg.png')",
    backgroundSize: "cover",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  },
  navbar: {
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  logo: {
    fontWeight: "700",
    background: "linear-gradient(45deg, #1b76ff, #9c27b0, #ff1e56)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "1.8rem",
  },
  navItem: {
    margin: "0 15px",
    fontWeight: "600",
  },
  card: {
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
    border: "none",
    transition: "transform 0.3s ease",
    overflow: "hidden",
  },
  cardHover: {
    transform: "translateY(-5px)",
  },
  button: {
    borderRadius: "50px",
    padding: "10px 20px",
    fontWeight: "600",
    background: "linear-gradient(45deg, #1b76ff, #9c27b0)",
    border: "none",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
  updates: {
    backgroundColor: "#f0ff96",
    borderRadius: "50px",
    padding: "5px 15px",
    fontWeight: "600",
    display: "inline-block",
    fontSize: "0.9rem",
  }
};

const Attendance = ({ navigate }) => (
  <div className="card mb-4" style={styles.card}>
    <div className="card-body p-4">
      <h2 className="fw-bold mb-3">Attendance</h2>
      <p className="text-muted mb-4">Manage student attendance records for all cohorts.</p>
      <button 
        className="btn btn-primary" 
        style={styles.button}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)} 
        onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.button)}
        onClick={() => navigate("/attendance")}
      >
        View Attendance
      </button>
    </div>
  </div>
);

const Quizzes = ({ navigate }) => (
  <div className="card mb-4" style={styles.card}>
    <div className="card-body p-4">
      <h2 className="fw-bold mb-3">Quizzes</h2>
      <p className="text-muted mb-4">Create and manage quizzes for skill assessment.</p>
      <button 
        className="btn btn-primary" 
        style={styles.button}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)} 
        onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.button)}
        onClick={() => navigate("/quizzes")}
      >
        View Quizzes
      </button>
    </div>
  </div>
);

const Assignments = () => (
  <div className="card mb-4" style={styles.card}>
    <div className="card-body p-4">
      <h2 className="fw-bold mb-3">Assignments</h2>
      <p className="text-muted mb-4">Manage hands-on assignments for industry readiness.</p>
      <button 
        className="btn btn-primary" 
        style={styles.button}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)} 
        onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.button)}
        onClick={() => alert("Manage Assignments Functionality Coming Soon!")}
      >
        View Assignments
      </button>
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        
        if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          const userData = await response.json();
          setUsername(userData.username || 'Admin');
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={styles.navbar}>
        <div className="container py-2">
          <a className="navbar-brand" href="/" style={styles.logo}>
            externship.life
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item" style={styles.navItem}>
                <a className="nav-link" href="/about"></a>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <a className="nav-link" href="/what-you-get"></a>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <a className="nav-link" href="/courses"></a>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <a className="nav-link" href="/pricing"></a>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <a className="nav-link" href="/faqs"></a>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <a className="nav-link" href="/contact"></a>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <a className="nav-link" href="/t-shaped"></a>
              </li>
            </ul>
            <div className="d-flex align-items-center ms-3">
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
                  {username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  {/* <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><a className="dropdown-item" href="/settings">Settings</a></li> */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        {/* Updates banner */}
        {/* <div className="mb-4">
          <span style={styles.updates} className="me-3">Updates</span>
          <span>Second Cohort Starts On March</span>
        </div> */}

        {/* Dashboard Title */}
        <div className="row mb-5">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4">Admin Dashboard</h1>
            <p className="lead">Manage your cohorts, assignments, attendance, and more.</p>
          </div>
        </div>

        {/* Main Dashboard Cards */}
        <div className="row mb-5">
          <div className="col-md-4">
            <Attendance navigate={navigate} />
          </div>
          <div className="col-md-4">
            <Quizzes navigate={navigate} />
          </div>
          <div className="col-md-4">
            <Assignments />
          </div>
        </div>

        {/* Recent Activity
        <div className="row mt-5">
          <div className="col-12">
            <div className="card" style={styles.card}>
              <div className="card-body p-4">
                <h2 className="fw-bold mb-4">Recent Activity</h2>
                <div className="list-group">
                  <div className="list-group-item border-0 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-bold">New Student Enrollment</h6>
                      <p className="text-muted mb-0 small">John Doe joined the March cohort</p>
                    </div>
                    <span className="badge bg-primary rounded-pill">5m ago</span>
                  </div>
                  <div className="list-group-item border-0 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-bold">Quiz Updated</h6>
                      <p className="text-muted mb-0 small">Advanced JavaScript Quiz was updated</p>
                    </div>
                    <span className="badge bg-primary rounded-pill">2h ago</span>
                  </div>
                  <div className="list-group-item border-0 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-bold">Attendance Recorded</h6>
                      <p className="text-muted mb-0 small">Attendance for React Fundamentals class was recorded</p>
                    </div>
                    <span className="badge bg-primary rounded-pill">1d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="bg-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">&copy; 2025 Externship.life. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <a href="/privacy" className="text-decoration-none me-3">Privacy Policy</a>
              <a href="/terms" className="text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
};

export default AdminDashboard;