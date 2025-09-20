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
            'radial-gradient(circle at 50% 15%, rgba(35,35,70,0.85) 0%, rgba(10,25,41,0.0) 55%)',
            'radial-gradient(circle at 50% 55%, rgba(35,35,70,0.6) 0%, rgba(10,25,41,0.0) 60%)',
            'radial-gradient(circle at 50% 95%, rgba(35,35,70,0.5) 0%, rgba(10,25,41,0.0) 60%)',
            '#0A1929'
          ].join(', '),
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          scrollbarWidth: 'none',        /* Firefox */
          msOverflowStyle: 'none',       /* IE/Edge */
          // Removed fixed height constraints to prevent mobile layout shifts
        },
        'body::-webkit-scrollbar': { width: 0, height: 0 }, /* Chrome/Safari */
        'body::-webkit-scrollbar-thumb': { background: 'transparent' },
      }} />
      <App />
    </ThemeProvider>
  // </StrictMode>
)
