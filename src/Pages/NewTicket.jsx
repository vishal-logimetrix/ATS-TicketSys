import React, { useState, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import { postRequest } from "../api/httpService";

const NewTicket = () => {
  const [selectedSerial, setSelectedSerial] = useState("");
  const [issueReported, setIssueReported] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [primaryContact, setPrimaryContact] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [productLocation, setProductLocation] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Validate file count
    if (selectedFiles.length > 5) {
      alert("Maximum 5 files allowed");
      return;
    }

    // Validate file size (25MB = 25 * 1024 * 1024 bytes)
    const oversized = selectedFiles.find((file) => file.size > 26214400);
    if (oversized) {
      alert("File size exceeds 25MB limit");
      return;
    }

    setFiles(selectedFiles.slice(0, 5));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).slice(0, 5);
    setFiles(droppedFiles);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleUploadClick = () => fileInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("serialNumber", selectedSerial);
    formData.append("issueReported", issueReported);
    formData.append("description", description);
    formData.append("priority", priority);
    formData.append("additionalInfo", additionalInfo);
    formData.append("productLocation", productLocation);

    formData.append("contact", JSON.stringify(primaryContact));

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const result = await postRequest("/ticket/create", formData);
      alert("Ticket submitted successfully!");

      // ✅ Reset form
      setSelectedSerial("");
      setIssueReported("");
      setDescription("");
      setPriority("");
      setAdditionalInfo("");
      setPrimaryContact({ name: "", phone: "", email: "" });
      setProductLocation("");
      setFiles([]);
      fileInputRef.current.value = null;
      
    } catch (err) {
      console.error("Error submitting ticket:", err);
      alert(
        err?.response?.data?.message ||
          "Something went wrong while submitting the ticket."
      );
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Typography variant="h5" fontWeight={700} gutterBottom>
        Create New Ticket
      </Typography>
      <hr />
      <div className="container py-4">
        <div className="card shadow border-0 rounded-2">
          <div className="card-body">
            <Typography variant="h6" fontWeight={700} gutterBottom>
              New Ticket
            </Typography>
            <hr />

            <form onSubmit={handleSubmit}>
              {/* Serial No + Issue Reported */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Device Serial No
                  </label>
                  <select
                    className="form-select"
                    value={selectedSerial}
                    onChange={(e) => setSelectedSerial(e.target.value)}
                    required
                  >
                    <option value="">Select Serial No</option>
                    <option value="SN123">SN123</option>
                    <option value="SN124">SN124</option>
                    <option value="SN125">SN125</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Issue Reported
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={issueReported}
                    onChange={(e) => setIssueReported(e.target.value)}
                    placeholder="Issue Reported to"
                  />
                </div>
              </div>

              {/* Auto Info (Static Example) */}
              {selectedSerial && (
                <>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Organisation Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value="ABC Corp"
                        readOnly
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Communication Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value="123 Street"
                        readOnly
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">State</label>
                      <input
                        type="text"
                        className="form-control"
                        value="Delhi"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="border rounded p-3 mb-4">
                    <h6 className="fw-bold text-secondary mb-3">Contacts</h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          value="Person 1"
                          readOnly
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          value="999999991"
                          readOnly
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="email"
                          className="form-control"
                          value="person1@example.com"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Description */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Issue Description
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="server is down from last 30 min's"
                ></textarea>
              </div>

              {/* Priority + Additional Info */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Severity (Priority)
                  </label>
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <option value="">Select Severity</option>
                    <option value="3">3 - No Business Impact (Low)</option>
                    <option value="2">
                      2 - Limited Business Impact (Medium)
                    </option>
                    <option value="1">
                      1 - Critical Business Impact (Critical)
                    </option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Additional Information
                  </label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="need the extra server as backup.."
                  ></textarea>
                </div>
              </div>

              {/* File Upload */}
              <div
                className="mb-4 border rounded-3 p-4 text-center bg-light"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ cursor: "pointer" }}
                onClick={handleUploadClick}
              >
                <input
                  type="file"
                  accept="image/*,.log,.txt"
                  multiple
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <p className="mb-1 fw-semibold">
                  Drag & drop files here or click to upload
                </p>
                <p className="text-muted small">
                  Max 25MB, up to 5 files allowed.
                </p>

                {files.length > 0 && (
                  <div className="row mt-3">
                    {files.map((file, index) => (
                      <div className="col-md-3 mb-3 text-center" key={index}>
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="img-fluid rounded"
                            style={{ height: 100, objectFit: "cover" }}
                          />
                        ) : (
                          <div className="text-center">
                            <InsertDriveFile fontSize="large" />
                            <p className="small text-truncate">{file.name}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Contact */}
              <div className="mb-4">
                <h6 className="fw-bold text-secondary">Primary Contact</h6>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={primaryContact.name}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          name: e.target.value,
                        })
                      }
                      placeholder="john doe"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={primaryContact.phone}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          phone: e.target.value,
                        })
                      }
                      placeholder="909876868"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={primaryContact.email}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          email: e.target.value,
                        })
                      }
                      placeholder="john@gmail.com"
                    />
                  </div>
                </div>
              </div>

              {/* Product Location */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Product Location (Address with Pincode)
                </label>
                <textarea
                  className="form-control"
                  rows="2"
                  required
                  value={productLocation}
                  onChange={(e) => setProductLocation(e.target.value)}
                  placeholder="plot no 12, john colony, Thane, Mumbai, 408765"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="text-end">
                <Button variant="contained" size="small" type="submit">
                  Create Ticket
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default NewTicket;
