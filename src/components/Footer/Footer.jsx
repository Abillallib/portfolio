import React from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        background: 'rgba(10, 25, 41, 0.9) radial-gradient(circle at center, rgba(123, 31, 162, 0.15) 0%, rgba(74, 20, 140, 0.08) 40%, transparent 70%)',
        backdropFilter: 'saturate(180%) blur(8px)',
        py: 3,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        mt: 4,
      }}
    >
      <Typography align="center" variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.875rem' }}>
        © {year} Adjaynae Billings. All rights reserved.
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="center">
        <IconButton color="inherit" component="a" href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </IconButton>
        <IconButton color="inherit" component="a" href="https://www.linkedin.com/in/adjaynae-billings" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
