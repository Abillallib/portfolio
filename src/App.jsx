import './App.css';
import Box from '@mui/material/Box';
import Header from './components/Header/Header';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import ParticleBackground from './components/Background/ParticleBackground';

function App() {
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#060e17',
      background: 'linear-gradient(180deg, rgba(6, 14, 23, 0.95) 0%, rgba(6, 14, 23, 0.9) 40%, rgba(6, 14, 23, 0.85) 100%)',
      position: 'relative',
      zIndex: 0,
    }}>
      <ParticleBackground />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <main style={{ marginTop: 4 }}>
          <Box
            id="hero"
            sx={{
              scrollMarginTop: '80px'
            }}
          >
            <Hero />
          </Box>
          
          <Box 
            id="projects" 
            sx={{ 
              scrollMarginTop: '80px',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '5%',
                right: '5%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <Projects />
          </Box>
          
          <Box
            id="about"
            sx={{
              scrollMarginTop: '80px',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '5%',
                right: '5%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <About />
          </Box>
          
          <Box
            id="contact"
            sx={{
              scrollMarginTop: '80px',
            }}
          >
            <Contact />
          </Box>
        </main>
        <Footer />
      </Box>
    </Box>
  )
}

export default App
