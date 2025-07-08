import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  AddCircleOutline as AddIcon,
  PersonAdd as UserAddIcon,
  Logout as LogoutIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import logo from "../assets/Img/TS-logo.png"

const Sidebar = ({ open }) => {
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon className="me-2" />,
      path: "/dashboard",
    },
    {
      text: "New Ticket",
      icon: <AddIcon className="me-2" />,
      path: "/dashboard/tickets",
    },
    {
      text: "New User",
      icon: <UserAddIcon className="me-2" />,
      path: "/dashboard/new-user",
    },
    {
      text: "Ticket History",
      icon: <HistoryIcon className="me-2" />,
      path: "/dashboard/history",
    },
  ];

  return (
    <div
      className={`bg-white border-end position-fixed top-0 start-0 h-100 shadow-sm`}
      style={{
        width: open ? 260 : 0,
        overflowX: "hidden",
        transition: "width 0.3s ease",
        zIndex: 1200,
      }}
    >
      {open && (
        <div className="d-flex flex-column h-100">
          {/* Logo Section */}
          <div className="d-flex align-items-center border-bottom px-3 py-4">
            {/* <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
              style={{ width: 40, height: 40 }}
            >
              T
            </div> */}
            {/* <h5 className="mb-0 fw-bold">TicketSystem</h5> */}
            <img src={logo} alt="Logo" style={{ width: 200, height: 80 }} />
          </div>

          {/* Menu */}
          <div className="flex-grow-1 px-3 py-2">
            <ul className="list-unstyled mb-2">
              {menuItems.map((item) => (
                <li key={item.text} className="mb-1 p-1">
                  <Link
                    to={item.path}
                    className={`d-flex align-items-center p-3 rounded text-decoration-none ${
                      location.pathname === item.path
                        ? "active fw-semibold"
                        : "text-dark"
                    }`}
                    style={{
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== item.path) {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.paddingLeft = "1.25rem";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== item.path) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.paddingLeft = "1rem";
                      }
                    }}
                  >
                    {item.icon}
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>

            <hr />

            {/* Logout */}
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/"
                  className="d-flex align-items-center p-3 rounded text-danger text-decoration-none"
                  style={{
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f8d7da")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <LogoutIcon className="me-2" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>

          {/* Footer Info */}
          <div className="border-top p-3 d-flex align-items-center">
            <div
              className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: 40, height: 40 }}
            >
              A
            </div>
            <div>
              <div className="fw-semibold">Admin User</div>
              <small className="text-muted">Administrator</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
