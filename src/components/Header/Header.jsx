import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box 
            component="img"
            src={`${import.meta.env.BASE_URL}favicon.ico`}
            alt="AB"
            sx={{
              width: 28,
              height: 28,
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
          <Typography variant="h6" component="div" sx={{ 
            color: '#FFFFFF', 
            fontWeight: 700, 
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            lineHeight: 1
          }}>
            Adjaynae Billings
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop navigation (md and up) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button
            sx={{ color: '#FFFFFF', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Projects
          </Button>
          <Button
            sx={{ color: '#FFFFFF', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            About
          </Button>
          <Button
            sx={{ color: '#FFFFFF', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Contact
          </Button>
          
          {/* GitHub Button */}
          <IconButton
            component="a"
            href="https://github.com/Abillallib"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#FFFFFF',
              ml: 1,
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'rgba(100, 255, 218, 0.1)'
              }
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>

        {/* Mobile menu button (xs to sm) */}
        <IconButton
          edge="end"
          aria-label={menuOpen ? "close menu" : "open menu"}
          onClick={menuOpen ? handleMenuClose : handleMenuOpen}
          sx={{
            color: '#FFFFFF',
            display: { xs: 'inline-flex', md: 'none' },
            ml: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
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
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              handleMenuClose();
            }}
            sx={{ color: '#FFFFFF' }}
          >
            Projects
          </MenuItem>
          <MenuItem
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              handleMenuClose();
            }}
            sx={{ color: '#FFFFFF' }}
          >
            About
          </MenuItem>
          <MenuItem
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              handleMenuClose();
            }}
            sx={{ color: '#FFFFFF' }}
          >
            Contact
          </MenuItem>
          <MenuItem
            component="a"
            href="https://github.com/Abillallib"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMenuClose}
            sx={{ color: '#FFFFFF' }}
          >
            GitHub
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
