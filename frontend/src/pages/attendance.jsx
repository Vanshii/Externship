import React, { useState } from 'react';
import { Container, Row, Col, Table, Alert, Card, Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaUserCheck, FaExclamationTriangle } from 'react-icons/fa';

const Attendance = ({ navigate }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  const fetchAttendance = () => {
    // Validate date selection
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    setIsLoading(true);
    setError("");

    fetch(`http://localhost:5000/attendance/date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date: selectedDate })
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (data.message) {
          setAttendanceRecords([]);
          setError(data.message);
        } else {
          setAttendanceRecords(data);
          setError("");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching attendance:", error);
        setError("Error fetching attendance.");
      });
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex align-items-center">
          <FaUserCheck className="me-2" />
          <h3 className="mb-0">Attendance Management</h3>
        </Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <FaCalendarAlt className="me-2" />
            Select Date for Attendance
          </Card.Title>
          
          {/* Date Selection Row */}
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group>
                <Form.Control 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button 
                variant="primary" 
                onClick={fetchAttendance}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner 
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-1"
                    />
                    Loading...
                  </>
                ) : (
                  "Fetch Attendance"
                )}
              </Button>
            </Col>
          </Row>

          {/* Error Handling */}
          {error && (
            <Alert variant="danger" className="d-flex align-items-center">
              <FaExclamationTriangle className="me-2" />
              {error}
            </Alert>
          )}

          {/* Attendance Table */}
          {attendanceRecords.length > 0 && (
            <>
              <h4 className="mt-3 mb-3">
                Attendance Records for {new Date(selectedDate).toLocaleDateString()}
              </h4>
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Student Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.studentEmail}</td>
                      <td>
                        <span 
                          className={`badge ${
                            record.status === 'Present' 
                              ? 'bg-success' 
                              : record.status === 'Absent' 
                              ? 'bg-danger' 
                              : 'bg-warning'
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {/* No Records Message */}
          {attendanceRecords.length === 0 && selectedDate && !isLoading && !error && (
            <Alert variant="info">
              No attendance records found for the selected date.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Attendance;