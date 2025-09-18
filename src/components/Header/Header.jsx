import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        background: 'rgba(10, 25, 41, 0.9) radial-gradient(circle at center, rgba(123, 31, 162, 0.15) 0%, rgba(74, 20, 140, 0.08) 40%, transparent 70%)',
        backdropFilter: 'saturate(180%) blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ color: '#FFFFFF', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
          Adjaynae Billings
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop navigation (md and up) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button
            sx={{ color: '#FFFFFF', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            component={Link}
            to="projects"
            smooth={true}
            duration={500}
            spy={true}
            offset={-64}
          >
            Projects
          </Button>
          <Button
            sx={{ color: '#FFFFFF', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            component={Link}
            to="about"
            smooth={true}
            duration={500}
            spy={true}
            offset={-64}
          >
            About
          </Button>
          <Button
            sx={{ color: '#FFFFFF', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            component={Link}
            to="contact"
            smooth={true}
            duration={500}
            spy={true}
            offset={-64}
          >
            Contact
          </Button>
        </Box>

        {/* Mobile menu button (xs to sm) */}
        <IconButton
          edge="end"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ 
            color: '#FFFFFF',
            display: { xs: 'inline-flex', md: 'none' },
            ml: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              bgcolor: 'rgba(10, 25, 41, 0.95)',
              backdropFilter: 'blur(8px)',
              minWidth: '200px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '& .MuiMenuItem-root': {
                color: '#FFFFFF',
                padding: '12px 24px',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }
          }}
        >
          <MenuItem
            component={Link}
            to="projects"
            smooth={true}
            duration={500}
            spy={true}
            offset={-64}
            onClick={handleMenuClose}
            sx={{ color: '#FFFFFF' }}
          >
            Projects
          </MenuItem>
          <MenuItem
            component={Link}
            to="about"
            smooth={true}
            duration={500}
            spy={true}
            offset={-64}
            onClick={handleMenuClose}
            sx={{ color: '#FFFFFF' }}
          >
            About
          </MenuItem>
          <MenuItem
            component={Link}
            to="contact"
            smooth={true}
            duration={500}
            spy={true}
            offset={-64}
            onClick={handleMenuClose}
            sx={{ color: '#FFFFFF' }}
          >
            Contact
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
