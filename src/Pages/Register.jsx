import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Img/TS-logo.png"

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    localStorage.setItem("token", "dummy");
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 4,
          maxWidth: 450,
          width: "100%",
          borderRadius: 3,
        }}
      >
        {/* Logo */}
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} alt="Logo" style={{ width: 200, height: 80 }} />
          {/* <h1>TicketSystem</h1> */}
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          fontWeight={600}
          align="center"
          color="primary"
          gutterBottom
        >
          Create Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Join our ticket system by creating your account
        </Typography>

        {/* Fields */}
        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email address"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Register Button */}
        <Button
          fullWidth
          className="btn btn-primary"
          variant="contained"
          size="large"
          onClick={handleRegister}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: "none",
            // backgroundColor: '#6d28d9',
            "&:hover": {
              backgroundColor: "#5b21b6",
            },
          }}
        >
          Sign Up
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Typography variant="body2" align="center" mt={3}>
          already have an account?{" "}
          <Link to="/" underline="hover" color="primary">
            Login now
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
