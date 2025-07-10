import React, { useEffect, useState } from "react";
import {
  AssignmentInd,
  TaskAlt,
  PendingActions,
  WarningAmber,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../api/httpService";
import { toast } from "react-toastify";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [totalCounts, setTotalCounts] = useState({
    totalTickets: 0,
    totalOpen: 0,
    totalClosed: 0,
    totalInprogress: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const greeting = `${getGreeting()}`;

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await getRequest("/ticket/list");
      console.log(data);
      const sorted = [...data.tickets]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5); // only recent 5
      setTickets(sorted);
      setTotalCounts({
        totalTickets: data.totalTickets,
        totalOpen: data.totalOpen,
        totalClosed: data.totalClosed,
        totalInprogress: data.totalInprogress,
      });
    } catch (err) {
      toast.error("Failed to load ticket history");
    }
  };

  const { totalTickets, totalOpen, totalClosed, totalInprogress } = totalCounts;

  return (
    <div className="container-fluid">
      <Box
        className="ps-3 mb-4"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: "#E3F2FD", 
          borderRadius: 1,
          px: 2,
          py: 1.5,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
          fontSize: { xs: "1.1rem", md: "1.25rem" },
          fontWeight: 600,
          color: "#0D47A1",
        }}
      >
        {greeting} <span className="text-danger text-capitalize fs-5">{ user?.fullname?.split(" ")[0] || "User" } 👋</span>
      </Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Dashboard Management
      </Typography>
      <hr />

      {/* Cards Row */}
      <div className="row g-4 mb-4">
        {/* Total Tickets */}
        <div className="col-sm-6 col-md-3">
          <div
            className="card shadow-sm border-0 h-100 rounded-1"
            style={{
              background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
              borderRadius: "1rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            }}
          >
            <div className="card-body d-flex align-items-center gap-3 p-4">
              <div
                className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 60,
                  height: 60,
                  color: "var(--bs-primary)",
                }}
              >
                <AssignmentInd fontSize="large" />
              </div>
              <div>
                <p className="text-muted mb-2 fw-semibold small">
                  Total Tickets
                </p>
                <h5 className="fw-bold text-primary mb-0">{totalTickets}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Resolved */}
        <div className="col-sm-6 col-md-3">
          <div
            className="card shadow-sm border-0 h-100 rounded-1"
            style={{
              background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
              borderRadius: "1rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            }}
          >
            <div className="card-body d-flex align-items-center gap-3 p-4">
              <div
                className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 60,
                  height: 60,
                  color: "var(--bs-success)",
                }}
              >
                <TaskAlt fontSize="large" />
              </div>
              <div>
                <p className="text-muted mb-2 fw-semibold small">Resolved</p>
                <h5 className="fw-bold text-success mb-0">{totalClosed}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="col-sm-6 col-md-3">
          <div
            className="card shadow-sm border-0 h-100 rounded-1"
            style={{
              background: "linear-gradient(135deg, #fffde7, #fff8e1)",
              borderRadius: "1rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            }}
          >
            <div className="card-body d-flex align-items-center gap-3 p-4">
              <div
                className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 60,
                  height: 60,
                  color: "var(--bs-warning)",
                }}
              >
                <PendingActions fontSize="large" />
              </div>
              <div>
                <p className="text-muted mb-2 fw-semibold small">In Progress</p>
                <h5 className="fw-bold text-warning mb-0">{totalInprogress}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Open */}
        <div className="col-sm-6 col-md-3">
          <div
            className="card shadow-sm border-0 h-100 rounded-1"
            style={{
              background: "linear-gradient(135deg, #ffebee, #ffcdd2)",
              borderRadius: "1rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            }}
          >
            <div className="card-body d-flex align-items-center gap-3 p-4">
              <div
                className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 60,
                  height: 60,
                  color: "var(--bs-danger)",
                }}
              >
                <WarningAmber fontSize="large" />
              </div>
              <div>
                <p className="text-muted mb-2 fw-semibold small">Open</p>
                <h5 className="fw-bold text-danger mb-0">{totalOpen}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="card shadow border rounded-0">
        <div className="card-header d-flex justify-content-between align-items-center p-3">
          <h6 className="mb-0">Recent Tickets</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-3">ID</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Create Date</th>
                  <th>Update Date</th>
                  <th>Assigned To</th>
                  <th className="text-end px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td className="px-3">{ticket.ticketId}</td>
                    <td
                      className="text-truncate"
                      style={{ maxWidth: "250px" }}
                      title={ticket.issueReported}
                    >
                      {ticket.issueReported}
                    </td>
                    <td>
                      <span
                        className={`badge bg-${
                          ticket.status === "closed"
                            ? "success"
                            : ticket.status === "in_progress"
                            ? "warning text-dark"
                            : "danger"
                        }`}
                      >
                        {ticket.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge bg-${
                          ticket.priority === "1"
                            ? "danger"
                            : ticket.priority === "2"
                            ? "warning text-dark"
                            : "secondary"
                        }`}
                      >
                        {ticket.priority === "1"
                          ? "High"
                          : ticket.priority === "2"
                          ? "Medium"
                          : "Low"}
                      </span>
                    </td>
                    <td>
                      {new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(ticket.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>{ticket.contact?.name || "Unassigned"}</td>
                    <td className="text-end px-5">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate(`/dashboard/ticket/${ticket._id}`)
                        }
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
