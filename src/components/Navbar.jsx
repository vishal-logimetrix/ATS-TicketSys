import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ toggleSidebar }) => {
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: '#fff', color: '#000', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <Toolbar>
        <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <InputBase
            placeholder="Ctrl + K"
            startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            sx={{
              bgcolor: '#f1f1f1',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 14,
              width: 250,
            }}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Avatar alt="John Doe" src="/profile.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
