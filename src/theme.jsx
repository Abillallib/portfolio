// src/theme.jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A1929', // Deep navy blue
      paper: 'transparent',
    },
    primary: {
      main: '#64FFDA', // Vibrant teal
    },
    secondary: {
      main: '#FFB74D', // Golden orange
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  // Global design tokens
  shape: {
    borderRadius: 12, // Consistent border radius
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.15)', // Custom subtle shadow
    '0 4px 16px rgba(0,0,0,0.2)',
    '0 8px 24px rgba(0,0,0,0.25)',
    '0 12px 32px rgba(0,0,0,0.3)',
    // ... rest use MUI defaults but we override key ones
    ...Array(20).fill('0 2px 8px rgba(0,0,0,0.15)'),
  ],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  // Global component overrides
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Removed universal transition to prevent mobile menu shifting
        // Global section spacing - exclude hero section
        '#projects, #about, #contact': {
          padding: '40px 0 !important',
          '@media (max-width: 900px)': {
            padding: '30px 0 !important',
          },
          '@media (max-width: 600px)': {
            padding: '24px 0 !important',
          },
        },
        // Hero section specific styles
        '#hero': {
          padding: '0 !important',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          '&[id="hero"]': {
            background: 'transparent !important',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 32px rgba(100, 255, 218, 0.2), 0 4px 16px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'filter 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            filter: 'brightness(1.2)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'filter 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            filter: 'brightness(1.2)',
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            borderRadius: 8,
            transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

export default theme;
