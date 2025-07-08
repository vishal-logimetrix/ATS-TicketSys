import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Backdrop,
  Fade,
  Typography,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const TicketDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [priority, setPriority] = useState("1");

  const images = [
    "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/054/628/719/small/a-tiger-running-on-rocks-in-the-wild-photo.jpg",
  ];

  const handleImageClick = (src) => {
    setPreviewImage(src);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const getPriorityColor = () => {
    switch (priority) {
      case "1":
        return "error";
      case "2":
        return "warning";
      case "3":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow border-0 rounded-0">
        <div className="card-header text-dark bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            Ticket Details <span className="fw-normal">#{id}</span>
          </h5>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </Button>
        </div>

        <div className="card-body">
          {/* Ticket Info */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <Typography variant="subtitle2" color="textSecondary">
                Subject
              </Typography>
              <Typography fontWeight={500}>Login issue on portal</Typography>
            </div>
            <div className="col-md-3 mb-3">
              <Typography variant="subtitle2" color="textSecondary">
                Assigned
              </Typography>
              <Typography fontWeight={500}>John Doe</Typography>
            </div>
            <div className="col-md-3 mb-3">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="d-flex justify-content-between align-items-center"
              >
                Priority
                {priority && (
                  <Chip
                    label={
                      priority === "1"
                        ? "Critical"
                        : priority === "2"
                        ? "Medium"
                        : "Low"
                    }
                    color={getPriorityColor()}
                    size="small"
                  />
                )}
              </Typography>
              <select
                className="form-select mt-1"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="3">3 - No Business Impact (Low)</option>
                <option value="2">2 - Limited Business Impact (Medium)</option>
                <option value="1">
                  1 - Critical Business Impact (Critical)
                </option>
              </select>
            </div>
          </div>

          {/* Status & Notes */}
          <div className="row mb-4">
            <div className="col-md-3">
              <Typography variant="subtitle2" color="textSecondary">
                Date
              </Typography>
              <Typography fontWeight={500}>2025-07-05</Typography>
            </div>
            <div className="col-md-4">
              <label className="form-label text-muted">Status</label>
              <select className="form-select" defaultValue="Open">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="col-md-5">
              <label className="form-label text-muted">Closing Note</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Enter reason for closing"
              />
            </div>
          </div>

          {/* Uploaded Images */}
          <div className="mb-4">
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Uploaded Images
            </Typography>
            <div className="d-flex flex-wrap gap-3">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="img-thumbnail rounded"
                  alt={`uploaded-${index}`}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(src)}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="outlined"
              size="small"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button variant="contained" size="small">
              Update
            </Button>
          </div>
        </div>
      </div>

      {/* Image Modal Preview */}
      <Modal
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 300 } }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              outline: "none",
              bgcolor: "transparent",
              p: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  minWidth: "unset",
                  width: 36,
                  height: 36,
                  bgcolor: "#000",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  borderRadius: "50%",
                  "&:hover": {
                    bgcolor: "#333",
                  },
                }}
              >
                &times;
              </Button>

              <img
                src={previewImage}
                alt="Preview"
                style={{
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TicketDetailsPage;
