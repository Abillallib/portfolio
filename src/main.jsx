import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material'
import theme from './theme.jsx'

createRoot(document.getElementById('root')).render(
  // Temporarily removed StrictMode to allow smooth loading animations
  // StrictMode causes double-mounting which interrupts progress animations
  // <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          /* layered radial highlights along the vertical to keep a subtle glow throughout */
          background: [
            'linear-gradient(180deg, rgba(6, 14, 23, 0.95) 0%, rgba(6, 14, 23, 0.9) 40%, rgba(6, 14, 23, 0.85) 100%)'
          ].join(', '),
          // backgroundAttachment: 'fixed', // Removed - causes issues on mobile
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%', // Ensure background covers full viewport
          minHeight: '100vh', // Ensure body covers full viewport height
          scrollbarWidth: 'none',        /* Firefox */
          msOverflowStyle: 'none',       /* IE/Edge */
          // Mobile-specific background color to prevent purple footer
          '@media (max-width: 600px)': {
            backgroundColor: '#060e17',
            background: [
              'linear-gradient(180deg, rgba(6, 14, 23, 0.95) 0%, rgba(6, 14, 23, 0.9) 40%, rgba(6, 14, 23, 0.85) 100%)'
            ].join(', '),
          },
          // Removed fixed height constraints to prevent mobile layout shifts
        },
        'body::-webkit-scrollbar': { width: 0, height: 0 }, /* Chrome/Safari */
        'body::-webkit-scrollbar-thumb': { background: 'transparent' },
      }} />
      <App />
    </ThemeProvider>
  // </StrictMode>
)
