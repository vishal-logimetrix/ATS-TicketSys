import { Typography, Stack, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRequest } from "../api/httpService";

const TicketHistory = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const USERS_PER_PAGE = 5;

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
    setSortBy("createdAt");
    setCurrentPage(1);
  };

  const fetchTickets = async () => {
    try {
      const data = await getRequest("/ticket/list");
      setTickets(data.tickets);
    } catch (err) {
      toast.error("Failed to load ticket history");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets
    .filter(
      (t) =>
        t.issueReported.toLowerCase().includes(search.toLowerCase()) ||
        t.ticketId.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      statusFilter ? t.status === statusFilter.toLowerCase() : true
    )
    .filter((t) =>
      priorityFilter
        ? t.priority ===
          (priorityFilter === "Low"
            ? "3"
            : priorityFilter === "Medium"
            ? "2"
            : "1")
        : true
    )
    .sort((a, b) => new Date(b[sortBy]) - new Date(a[sortBy]));

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(filteredTickets.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  const downloadCSV = () => {
    const csv = [
      [
        "Ticket ID",
        "Issue Reported",
        "Issue Description",
        "Priority",
        "Status",
        "Additional Info",
        "Contact Name",
        "Contact Email",
        "Contact Phone",
        "Product Location",
        "Created At",
        "Updated At",
        "File Paths",
      ],
      ...filteredTickets.map((t) => [
        t.ticketId,
        t.issueReported,
        t.issueDescription || "-",
        t.priority === "1" ? "Critical" : t.priority === "2" ? "Medium" : "Low",
        t.status,
        t.additionalInfo || "-",
        t.contact?.name || "-",
        t.contact?.email || "-",
        t.contact?.phone || "-",
        t.productLocation || "-",
        new Date(t.createdAt).toLocaleDateString(),
        new Date(t.updatedAt).toLocaleDateString(),
        t.filePaths?.join(" | ").replace(/\\/g, "/") || "-",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(",")) // CSV escape quotes
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
      <div className="container-fluid">
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
              placeholder="By ID or Issue"
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
              <option>In_progress</option>
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
              <option value="createdAt">Created Date (Newest)</option>
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
                <th className="ps-4">#</th>
                <th>Ticket ID</th>
                <th>Issue Reported</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Contact</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                paginatedTickets.map((ticket, index) => (
                  <tr key={index}>
                    <td className="ps-4">{index + 1}</td>
                    <td>{ticket.ticketId}</td>
                    <td>{ticket.issueReported}</td>
                    <td>
                      {new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          ticket.status === "closed"
                            ? "bg-success"
                            : ticket.status === "in progress"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {ticket.status.charAt(0).toUpperCase() +
                          ticket.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          ticket.priority === "1"
                            ? "bg-danger"
                            : ticket.priority === "2"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {ticket.priority === "1"
                          ? "Critical"
                          : ticket.priority === "2"
                          ? "Medium"
                          : "Low"}
                      </span>
                    </td>
                    <td>{ticket.contact?.name || "-"}</td>
                    <td>{new Date(ticket.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/dashboard/ticket/${ticket._id}`, {
                            state: { ticket },
                          });
                        }}
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

        {/* Pagination Control */}
        {tickets.length > USERS_PER_PAGE && (
          <Stack spacing={2} className="mt-4 align-items-end">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        )}
      </div>
      </div>
    </>
  );
};

export default TicketHistory;
