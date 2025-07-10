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
import { postRequest } from "../api/httpService";
import { toast } from 'react-toastify';
import logo from "../assets/Img/TS-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await postRequest("/user/login", form);

      // Store token and user info in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      // Error toast is handled in axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d0e8ff, #ffffff)',
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
        className="border-0 shadow"
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} alt="Logo" style={{ width: 200, height: 80 }} />
        </Box>

        <Typography variant="h5" fontWeight="600" align="center" color="primary" gutterBottom>
          Hi, Welcome Back
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" mb={3}>
          Enter your credentials to continue
        </Typography>

        <TextField
          fullWidth
          name="email"
          label="Email Address / Username"
          variant="outlined"
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={form.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(prev => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" />}
            label="Keep me logged in"
          />
          <MuiLink href="#" variant="body2" underline="hover" color="primary">
            Forgot Password?
          </MuiLink>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLogin}
          className='btn btn-primary'
          disabled={loading}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#5b21b6',
            },
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        {/* <Typography variant="body2" align="center" mt={3}>
          Don't have an account?{' '}
          <Link to="/register" underline="hover" color="primary">
            Create one
          </Link>
        </Typography> */}
      </Paper>
    </Box>
  );
};

export default Login;
