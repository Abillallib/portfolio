import React from 'react';
import { Box, Typography, LinearProgress, Button, Alert } from '@mui/material';
import { RocketLaunch as RocketIcon } from '@mui/icons-material';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

const VideoLoadingOverlay = ({ isVisible, progress, error, onRetry }) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Determine loading stage based on progress
  const getLoadingStage = () => {
    if (error) return error;
    if (progress >= 100) return 'Complete!';
    if (progress >= 85) return 'Almost ready...';
    if (progress >= 50) return 'Loading content...';
    return 'Preparing experience...';
  };

  // console.log('🎨 VideoLoadingOverlay RENDERING - Progress:', progress, 'Is Visible:', isVisible);

  if (!isVisible) {
    // console.log('🚫 VideoLoadingOverlay HIDDEN');
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0e1a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        opacity: progress >= 100 ? 0 : 1, // Fade out when complete
        transition: 'opacity 800ms ease-out', // Smooth fade
      }}
    >
      {/* Particle Background - Same as before */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}>
        <Particles
          id="loading-particles"
          init={particlesInit}
          options={{
            fpsLimit: 30,
            particles: {
              number: {
                value: 15,
                density: {
                  enable: true,
                  area: 800
                }
              },
              color: {
                value: '#2bd0bd'
              },
              shape: {
                type: 'circle'
              },
              opacity: {
                value: 0.5,
                random: true,
                animation: {
                  enable: true,
                  speed: 3,
                  minimumValue: 0.1,
                  sync: false
                }
              },
              size: {
                value: { min: 1, max: 4 },
                random: true
              },
              links: {
                color: '#2bd0bd',
                opacity: 0.4,
                distance: 120,
                enable: true,
                width: 1,
                warp: true,
                triangles: {
                  enable: true,
                  opacity: 0.1
                },
                type: 'cubic'
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: 'none',
                random: false,
                straight: false,
                outModes: {
                  default: 'bounce'
                }
              }
            },
            interactivity: {
              detectsOn: 'canvas',
              events: {
                onHover: {
                  enable: false
                },
                onClick: {
                  enable: false
                },
                resize: true
              }
            },
            detectRetina: true
          }}
        />
      </div>

      {/* Loading Content - Exact same visual design */}
      <Box
        sx={{
          textAlign: 'center',
          zIndex: 1,
          px: 4,
          maxWidth: 400
        }}
      >
        {/* Rocket Icon - Same animation and styling */}
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'center',
            animation: 'rocketFloat 2s ease-in-out infinite'
          }}
        >
          <RocketIcon
            sx={{
              fontSize: 80,
              color: '#64ffda',
              filter: 'drop-shadow(0 0 20px rgba(100, 255, 218, 0.5))'
            }}
          />
        </Box>

        {/* Loading Text - Same typography */}
        <Typography
          variant="h4"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          Loading Experience
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 4,
            minHeight: '1.5rem'
          }}
        >
          {error || getLoadingStage()}
        </Typography>

        {/* Error Alert with Retry Button */}
        {error && onRetry && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: '#ff6b6b'
              }
            }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={onRetry}
                sx={{
                  color: '#64ffda',
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.1)'
                  }
                }}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {/* Progress Bar - Same Material-UI styling */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#64ffda',
                borderRadius: 4,
              }
            }}
          />
        </Box>

        {/* Percentage - Same styling */}
        <Typography
          variant="h6"
          sx={{
            color: '#64ffda',
            fontWeight: 600
          }}
        >
          {Math.round(progress)}%
        </Typography>
        {/* console.log('📊 PERCENTAGE DISPLAY:', Math.round(progress) + '%') */}
      </Box>

      {/* CSS Animation using standard React approach */}
      <style>{`
        @keyframes rocketFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
};

export default VideoLoadingOverlay;
