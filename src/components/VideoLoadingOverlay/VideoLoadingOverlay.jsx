import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { RocketLaunch as RocketIcon } from '@mui/icons-material';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

const VideoLoadingOverlay = ({ isVisible, onVideoReady }) => {
  const [progress, setProgress] = useState(0);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    if (!isVisible) return;

    // Simulate progress loading
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          return prevProgress;
        }
        return prevProgress + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

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
      }}
    >
      {/* Particle Background */}
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

      {/* Loading Content */}
      <Box
        sx={{
          textAlign: 'center',
          zIndex: 1,
          px: 4,
          maxWidth: 400
        }}
      >
        {/* Rocket Icon */}
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

        {/* Loading Text */}
        <Typography
          variant="h4"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          Loading Experience
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 4
          }}
        >
          Preparing your immersive experience...
        </Typography>

        {/* Progress Bar */}
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

        {/* Percentage */}
        <Typography
          variant="h6"
          sx={{
            color: '#64ffda',
            fontWeight: 600
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Box>

      <style jsx>{`
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
