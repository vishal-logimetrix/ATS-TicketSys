import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserRole } from "../utils/auth";

const Navbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = getCurrentUser()
  const role = getUserRole() || "user";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
    handleMenuClose();
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#fff",
        color: "#000",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          <InputBase
            placeholder="Ctrl + K"
            startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            sx={{
              bgcolor: "#f1f1f1",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 14,
              width: 250,
            }}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              // bgcolor: "#f5f5f5",
              px: 1.5,
              py: 0.5,
              borderRadius: "20px",
              // "&:hover": {
              //   bgcolor: "#ebebeb",
              // },
            }}
          >
            <Avatar
            className="bg-secondary"
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
                // bgcolor: "#1976d2",
                mr: 1,
              }}
            >
              {user?.fullname?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <Typography variant="body2" fontWeight={500}>
              {user?.fullname || "User"}
            </Typography>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem disabled>
              <Typography variant="body1">
                {user?.fullname || "User"}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
