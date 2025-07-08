import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Link as MuiLink
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/Img/TS-logo.png"

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    localStorage.setItem('token', 'dummy');
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 4,
          maxWidth: 450,
          width: '100%',
          borderRadius: 3,
        }}
      >
        {/* Logo */}
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 200, height: 80 }}
          />
          {/* <h1>TicketSystem</h1> */}
        </Box>

        {/* Heading */}
        <Typography variant="h5" fontWeight="600" align="center" color="primary" gutterBottom>
          Hi, Welcome Back
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" mb={3}>
          Enter your credentials to continue
        </Typography>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="Email Address / Username"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
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

        {/* Checkbox + Forgot Password */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={1}
        >
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" />}
            label="Keep me logged in"
          />
          <MuiLink href="#" variant="body2" underline="hover" color="primary">
            Forgot Password?
          </MuiLink>
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLogin}
          className='btn btn-primary'
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: 'none',
            // backgroundColor: '#6d28d9',
            '&:hover': {
              backgroundColor: '#5b21b6',
            },
          }}
        >
          Sign In
        </Button>

        {/* Register Prompt */}
        <Typography variant="body2" align="center" mt={3}>
          Don't have an account?{' '}
          <Link to="/register" underline="hover" color="primary">
            Create one
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
