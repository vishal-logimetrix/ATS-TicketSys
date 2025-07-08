import React from "react";
import {
  AssignmentInd,
  TaskAlt,
  PendingActions,
  WarningAmber,
} from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const tickets = [
  {
    id: "TCK-001",
    subject: "Login issue on portal Login issue on portal Login issue on portalLogin issue on portalLogin issue on portal",
    status: "Open",
    priority: "High",
    date: "2025-07-05",
    assigned: "John Doe",
  },
  {
    id: "TCK-002",
    subject: "Payment gateway error",
    status: "In Progress",
    priority: "Medium",
    date: "2025-07-04",
    assigned: "Jane Smith",
  },
  {
    id: "TCK-003",
    subject: "UI bug in mobile view",
    status: "Closed",
    priority: "Low",
    date: "2025-07-01",
    assigned: "Mike Johnson",
  },
  {
    id: "TCK-004",
    subject: "Unable to reset password",
    status: "Closed",
    priority: "Medium",
    date: "2025-07-01",
    assigned: "Sarah Williams",
  },
];



const Dashboard = () => {

  const navigate = useNavigate()
  const total = tickets.length;
  const solved = tickets.filter((t) => t.status === "Closed").length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const progress = tickets.filter((t) => t.status === "In Progress").length;

  return (
    <div className="container-fluid">
      <Typography variant="h5" fontWeight={700} mb={3}>Dasboard Managment</Typography>
      <hr />
      {/* Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-md-3">
          <div className="card shadow h-100 border-0 p-3" style={{background: '#e3f2fd'}}>
            <div className="card-body d-flex align-items-center">
              <AssignmentInd className="text-primary me-3" fontSize="large" />
              <div>
                <p className="text-muted mb-1">Total Tickets</p>
                <h5 className="fw-semibold mb-0 text-primary">{total}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card shadow h-100 border-0 p-3" style={{background: '#e8f5e9'}}>
            <div className="card-body d-flex align-items-center">
              <TaskAlt className="text-success me-3" fontSize="large" />
              <div>
                <p className="text-muted mb-1">Resolved</p>
                <h5 className="fw-semibold mb-0 text-success">{solved}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3" >
          <div className="card shadow h-100 border-0 p-3" style={{background: '#fff8e1'}}>
            <div className="card-body d-flex align-items-center">
              <PendingActions className="text-warning me-3" fontSize="large" />
              <div>
                <p className="text-muted mb-1">In Progress</p>
                <h5 className="fw-semibold mb-0 text-warning">{progress}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card shadow h-100 border-0 p-3" style={{background: '#ffebee'}}>
            <div className="card-body d-flex align-items-center">
              <WarningAmber className="text-danger me-3" fontSize="large" />
              <div>
                <p className="text-muted mb-1">Reject</p>
                <h5 className="fw-semibold mb-0 text-danger">{open}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Ticket Table */}
      <div className="card shadow border rounded-0">
        <div className="card-header d-flex justify-content-between align-items-center p-3">
          <h6 className="mb-0">Recent Tickets</h6>
          {/* <Button variant="outlined" size="small" sx={{ textTransform: "none" }}>
            View All
          </Button> */}
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
                  <th>Date</th>
                  <th>Assigned To</th>
                  <th className="text-end px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="px-3">{ticket.id}</td>
                    <td className="text-truncate" style={{ maxWidth: "250px" }} title={ticket.subject}>
                      {ticket.subject}
                    </td>
                    <td>
                      {ticket.status}
                    </td>
                    <td>
                      {ticket.priority}
                    </td>
                    <td>{ticket.date}</td>
                    <td>{ticket.assigned}</td>
                    <td className="text-end px-5">
                      <Button variant="contained" size="small" onClick={() => navigate(`/dashboard/ticket/${ticket.id}`)} >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
