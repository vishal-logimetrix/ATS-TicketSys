import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getRequest, putRequest } from "../api/httpService";
import { Modal, Box } from "@mui/material";
import { getCurrentUser, getUserRole } from "../utils/auth";

const TicketDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [priority, setPriority] = useState("3");
  const [status, setStatus] = useState("open");
  const [closingNote, setClosingNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const user = getCurrentUser()
  const role = getUserRole() || "user";
  const canEdit = role === "admin" || role === "superadmin";

  useEffect(() => {
    if (!ticket || ticket._id !== id) {
      fetchTicket();
    }
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const ticketData = await getRequest(`/ticket/list/${id}`);
      const normalizedTicket = {
        ...ticketData,
        priority: ticketData.priority?.toString() || "3",
        status: ticketData.status || "open",
        closingNote: ticketData.closingNote || "",
      };
      setTicket(normalizedTicket);
      setPriority(normalizedTicket.priority);
      setStatus(normalizedTicket.status);
      setClosingNote(normalizedTicket.closingNote);
    } catch (err) {
      toast.error("Ticket not found");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (status === "closed" && !closingNote.trim()) {
      toast.error("Closing note is required when closing the ticket.");
      return;
    }
    if (
      status === "closed" &&
      !window.confirm("Are you sure you want to close this ticket?")
    ) {
      return;
    }
    try {
      setUpdating(true);
      await putRequest(`/ticket/${id}`, {
        priority,
        status,
        closingNote: status === "closed" ? closingNote : "",
      });
      toast.success("Ticket updated successfully");
      await fetchTicket();
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update ticket");
    } finally {
      setUpdating(false);
    }
  };

  if (!ticket) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  const images =
    ticket.filePaths?.map(
      (path) =>
        `${import.meta.env.VITE_API_BASE_URL}/${path.replace(/\\/g, "/")}`
    ) || [];

  return (
    <div className="container-fluid">
      <div className="container py-4">
      <div className="card shadow rounded-3 p-4 border-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-0">Ticket #{ticket.ticketId}</h4>
            <small className="text-muted">
              Created on{" "}
              {new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </small>
          </div>
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </button>
            {canEdit && !isEditing && ticket.status !== "closed" && (
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <hr />
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Issue Reported</label>
            <input
              type="text"
              className="form-control"
              value={ticket.issueReported}
              disabled
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Serial Number</label>
            <input
              type="text"
              className="form-control"
              value={ticket.serialNumber}
              disabled
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={ticket.productLocation}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={!isEditing || ticket.status === "closed"}
            >
              <option value="3">3 - Low</option>
              <option value="2">2 - Medium</option>
              <option value="1">1 - Critical</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!isEditing || ticket.status === "closed"}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          {status === "closed" && (
            <div className="col-12">
              <label className="form-label">Closing Note</label>
              <textarea
                className="form-control"
                value={closingNote}
                onChange={(e) => setClosingNote(e.target.value)}
                disabled={!isEditing}
                rows={2}
              />
            </div>
          )}

          <div className="col-12">
            <label className="form-label">Additional Info</label>
            <textarea
              className="form-control"
              value={ticket.additionalInfo || "N/A"}
              disabled
              rows={4}
              style={{ resize: "vertical" }}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={ticket.description || ""}
              disabled
              rows={4}
              style={{ resize: "vertical" }}
            />
          </div>

          {isEditing && (
            <div className="col-12 d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => setIsEditing(false)}
                disabled={updating}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-5">
          <h6 className="fw-bold">Contact Info</h6>
          <p>
            <strong>Name:</strong> {ticket.contact?.name || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {ticket.contact?.phone || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {ticket.contact?.email || "N/A"}
          </p>
        </div>

        <div className="mt-4">
          <h6 className="fw-bold">Uploaded Images</h6>
          {images.length > 0 ? (
            <div className="row g-3">
              {images.map((src, idx) => (
                <div className="col-4 col-md-3 col-lg-2" key={idx}>
                  <img
                    src={src}
                    alt={`uploaded-${idx}`}
                    className="rounded shadow-sm"
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => setPreviewImage(src)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted fst-italic">No images uploaded.</p>
          )}
        </div>
      </div>

      {/* MUI Image Preview Modal */}
      <Modal open={!!previewImage} onClose={() => setPreviewImage(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 0,
            width: "60vw",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setPreviewImage(null)}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              border: "none",
              background: "transparent",
              fontSize: "1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              lineHeight: "1",
              zIndex: 1,
            }}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={previewImage}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Modal>
    </div>
    </div>
  );
};

export default TicketDetailsPage;
