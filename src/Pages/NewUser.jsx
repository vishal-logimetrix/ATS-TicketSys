import React from "react";
import { Typography } from "@mui/material";

const NewUser = () => {
  return (
    <>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Create New User
      </Typography>
      <hr />
      <div className="container py-4">
        <div className="card shadow border-0 rounded-0">
          <div className="card-body">
            <Typography variant="h6" fontWeight={700} gutterBottom>
              New User
            </Typography>
            <hr />
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email address"
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
                    className="form-control"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Role</label>
                  <select className="form-select" required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="client">Client</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Set a password"
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
      </div>
    </>
  );
};

export default NewUser;
