import React, { useState, useEffect } from "react";
import { Card, Button, Form, Alert, Modal } from "react-bootstrap";
import { Trash2, ExternalLink, Plus } from "lucide-react";

const Assignments = ({ onNavigate }) => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: "", link: "" });
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      onNavigate && onNavigate("/login");
      return;
    }

    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:5000/assignments/all", {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }

        const data = await response.json();
        setAssignments(data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments.");
      }
    };

    fetchAssignments();
  }, [onNavigate]);

  const addAssignment = async () => {
    if (!newAssignment.title.trim() || !newAssignment.link.trim()) {
      setError("Please fill in both title and link.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/assignments/add", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAssignment)
      });

      if (!response.ok) {
        throw new Error("Failed to add assignment");
      }

      const data = await response.json();
      setAssignments([...assignments, data.assignment]);
      setNewAssignment({ title: "", link: "" });
      setError(null);
    } catch (err) {
      console.error("Error adding assignment:", err);
      setError("Failed to add assignment.");
    }
  };

  const deleteAssignment = async () => {
    if (!assignmentToDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/assignments/delete/${assignmentToDelete}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete assignment");
      }

      setAssignments(assignments.filter((assignment) => assignment._id !== assignmentToDelete));
      setShowDeleteModal(false);
      setAssignmentToDelete(null);
    } catch (err) {
      console.error("Error deleting assignment:", err);
      setError("Failed to delete assignment.");
      setShowDeleteModal(false);
    }
  };

  const confirmDelete = (id) => {
    setAssignmentToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="container py-4">
      <Card>
        <Card.Header>
          <h2 className="mb-0">Manage Assignments</h2>
        </Card.Header>
        <Card.Body>
          {/* Error Alert */}
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {/* Add New Assignment Form */}
          <Form className="mb-4">
            <div className="row g-2">
              <div className="col-md-5">
                <Form.Control
                  type="text"
                  placeholder="Assignment Title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                />
              </div>
              <div className="col-md-5">
                <Form.Control
                  type="text"
                  placeholder="Assignment Link"
                  value={newAssignment.link}
                  onChange={(e) => setNewAssignment({ ...newAssignment, link: e.target.value })}
                />
              </div>
              <div className="col-md-2">
                <Button onClick={addAssignment} className="w-100">
                  <Plus className="me-2" size={16} /> Add
                </Button>
              </div>
            </div>
          </Form>

          {/* Assignments List */}
          <h3 className="mb-3">All Assignments</h3>
          {assignments.length === 0 ? (
            <p className="text-center text-muted">No assignments found</p>
          ) : (
            <div className="list-group">
              {assignments.map((assignment) => (
                <div 
                  key={assignment._id} 
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5 className="mb-1">{assignment.title}</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button 
                      variant="outline-primary" 
                      className="me-2"
                      onClick={() => window.open(assignment.link, "_blank")}
                    >
                      <ExternalLink size={16} />
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => confirmDelete(assignment._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteAssignment}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Assignments;