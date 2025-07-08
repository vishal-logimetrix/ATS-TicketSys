import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleTickets = [
  {
    id: "TCK-2025-001",
    subject: "Login failure",
    date: "2025-07-01",
    priority: "Critical",
    status: "Closed",
    assignedTo: "John Doe",
    updatedAt: "2025-07-05",
  },
  {
    id: "TCK-2025-002",
    subject: "Network issue",
    date: "2025-07-03",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "IT Team",
    updatedAt: "2025-07-06",
  },
];

const TicketHistory = () => {
  const navigate = useNavigate();
  const [tickets] = useState(sampleTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const handleSearch = (e) => setSearch(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);
  const handlePriorityFilter = (e) => setPriorityFilter(e.target.value);
  const handleSort = (e) => setSortBy(e.target.value);

  // ✅ Clear All Filters
  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
    setSortBy("date");
  };

  const filteredTickets = tickets
    .filter(
      (t) =>
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (statusFilter ? t.status === statusFilter : true))
    .filter((t) => (priorityFilter ? t.priority === priorityFilter : true))
    .sort((a, b) => new Date(b[sortBy]) - new Date(a[sortBy]));

  const downloadCSV = () => {
    const csv = [
      [
        "Ticket ID",
        "Subject",
        "Date",
        "Status",
        "Priority",
        "Assigned To",
        "Last Updated",
      ],
      ...filteredTickets.map((t) => [
        t.id,
        t.subject,
        t.date,
        t.status,
        t.priority,
        t.assignedTo,
        t.updatedAt,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "ticket_history.csv");
    link.click();
  };

  return (
    <>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Ticket History
      </Typography>
      <hr />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">History</h4>
          <button
            onClick={downloadCSV}
            className="btn btn-outline-secondary btn-sm"
          >
            Download CSV
          </button>
        </div>

        {/* Filters */}
        <div className="row g-2 align-items-end mb-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="By ID or Subject"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label fw-semibold">Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option value="">All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label fw-semibold">Priority</label>
            <select
              className="form-select"
              value={priorityFilter}
              onChange={handlePriorityFilter}
            >
              <option value="">All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>Critical</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Sort</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={handleSort}
            >
              <option value="date">Created Date (Newest)</option>
              <option value="updatedAt">Last Updated</option>
            </select>
          </div>
          <div className="col-md-2 text-end">
            <button
              className="btn btn-outline-danger btn-sm mt-3 w-100"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket, index) => (
                  <tr key={index}>
                    <td>{ticket.id}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.date}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.assignedTo}</td>
                    <td>{ticket.updatedAt}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/dashboard/ticket/${ticket.id}`)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TicketHistory;
