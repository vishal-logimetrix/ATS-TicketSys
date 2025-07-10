import React, { useEffect, useState } from "react";
import { Typography, Chip, Pagination, Stack } from "@mui/material";
import { getRequest, postRequest, putRequest } from "../api/httpService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const USERS_PER_PAGE = 5;

const NewUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
  });

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getRequest("/user/users");
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const onNewUserCreate = async (e) => {
  e.preventDefault();

  const result = await Swal.fire({
    title: "Create New User?",
    text: "Are you sure you want to add this user?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Create",
  });

  if (result.isConfirmed) {
    try {
      const newUser = await postRequest("/user/register", formData);

      // Refresh list & reset form
      fetchUsers();
      setFormData({
        fullname: "",
        email: "",
        mobile: "",
        role: "",
        password: "",
      });
      setCurrentPage(1);

      // Success alert
      Swal.fire({
        icon: "success",
        title: "User Created",
        text: newUser.message || "User has been added successfully.",
      });
    } catch (err) {
      console.error("Create user failed", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err?.response?.data?.message ||
          "An error occurred while creating the user.",
      });
    }
  } else {
    toast.info("User creation cancelled");
  }
};


  const toggleStatus = async (id) => {
    const selectedUser = users.find((u) => u._id === id);
    const newStatus = selectedUser.status === "active" ? "inactive" : "active";

    const result = await Swal.fire({
      title: `Change status to ${newStatus}?`,
      text: `Are you sure you want to ${
        newStatus === "active" ? "activate" : "deactivate"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it",
    });

    if (result.isConfirmed) {
      try {
        const response = await putRequest(
          `/user/${id}`,
          { status: newStatus },
          "PUT"
        );

        toast.success("User status updated successfully");
        fetchUsers(); // Refresh user list
      } catch (err) {
        toast.error("Failed to update user status");
        console.error("Status update failed", err);
      }
    } else {
      toast.info("Status change cancelled");
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <>
      <div className="container-fluid">
              <Typography variant="h5" fontWeight={700} gutterBottom>
        Create New User
      </Typography>
      <hr />
      <div className="container py-4">
        <div className="card shadow border-0 rounded-2 mb-4">
          <div className="card-body">
            <Typography variant="h6" fontWeight={700} gutterBottom>
              New User
            </Typography>
            <hr />
            <form onSubmit={onNewUserCreate}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    className="form-control"
                    placeholder="Enter full name"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Set a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4 fw-semibold"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* User List Table */}
        <div className="card shadow border-0 rounded-2">
          <div className="card-body">
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Existing Users
            </Typography>
            <hr />
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.role}</td>
                      <td>
                        <Chip
                          label={
                            user.status === "active" ? "Active" : "Inactive"
                          }
                          color={user.status === "active" ? "success" : "error"}
                          size="small"
                          variant="outlined"
                        />
                      </td>
                      <td className="text-end">
                        <button
                          className={`btn btn-sm ${
                            user.status === "active"
                              ? "btn-outline-danger"
                              : "btn-outline-success"
                          }`}
                          onClick={() => toggleStatus(user._id)}
                        >
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Control */}
            {users.length > USERS_PER_PAGE && (
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
      </div>
      </div>
    </>
  );
};

export default NewUser;
