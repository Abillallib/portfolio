import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Box, Typography, LinearProgress } from '@mui/material';
import { RocketLaunch as RocketIcon } from '@mui/icons-material';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

const VideoLoadingOverlay = ({ isVisible, onVideoReady, videoSrc }) => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Preparing experience...');
  const videoRef = useRef(null);
  const progressTimeoutRef = useRef(null);
  const cleanupFunctionsRef = useRef([]);

  // Smooth progress update that prevents backward jumping
  const updateProgress = useCallback((newProgress) => {
    setProgress(prev => {
      // Never allow progress to decrease
      const clampedProgress = Math.max(prev, Math.min(newProgress, 100));
      return clampedProgress;
    });
  }, []);

  // Debounced progress update to prevent rapid changes
  const debouncedProgressUpdate = useCallback((targetProgress) => {
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
    }

    progressTimeoutRef.current = setTimeout(() => {
      updateProgress(targetProgress);
    }, 100); // 100ms debounce

    // Store cleanup function
    cleanupFunctionsRef.current.push(() => {
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
    });
  }, [updateProgress]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    if (!isVisible || !videoSrc) return;

    let isVideoReady = false;
    let maxProgressReached = 0;

    // Create single video instance (prevents multiple videos)
    if (!videoRef.current) {
      videoRef.current = document.createElement('video');
      videoRef.current.preload = 'auto';
      videoRef.current.muted = true;
    }

    const video = videoRef.current;

    // Phase 1: Connection
    const handleLoadStart = () => {
      setLoadingStage('Preparing experience...');
      debouncedProgressUpdate(10);
    };

    // Phase 2: Metadata loaded
    const handleMetadata = () => {
      setLoadingStage('Loading content...');
      debouncedProgressUpdate(30);
    };

    // Phase 3: Initial data
    const handleDataLoaded = () => {
      setLoadingStage('Almost ready...');
      debouncedProgressUpdate(50);
    };

    // Phase 4: Can play
    const handleCanPlay = () => {
      setLoadingStage('Finalizing...');
      debouncedProgressUpdate(80);
    };

    // Phase 5: Full loading - most important event
    const handleCanPlayThrough = () => {
      setLoadingStage('Complete!');
      isVideoReady = true;
      debouncedProgressUpdate(100);

      // Wait a moment to show 100%, then check if video is truly ready
      setTimeout(() => {
        if (isVideoReady) {
          onVideoReady();
        }
      }, 800);
    };

    // Phase 6: Real buffering progress (smoothed)
    const handleProgress = () => {
      try {
        if (video.buffered.length > 0) {
          const buffered = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;

          if (duration > 0 && !isNaN(duration)) {
            const bufferedPercent = (buffered / duration) * 100;
            // Smooth progress between 50-90% based on real buffering
            const targetProgress = Math.min(90, Math.max(50, bufferedPercent));
            
            // Only update if this is higher than current progress
            if (targetProgress > maxProgressReached) {
              maxProgressReached = targetProgress;
              debouncedProgressUpdate(targetProgress);
            }
          }
        }
      } catch (error) {
        // Silently handle buffering calculation errors
        console.debug('Buffering calculation error:', error);
      }
    };

    // Error handling
    const handleError = (error) => {
      console.error('Video loading error:', error);
      setLoadingStage('Retrying...');
      // Don't reset progress on error, just show error state
    };

    // Safety timeout - maximum loading time
    const safetyTimeout = setTimeout(() => {
      if (!isVideoReady) {
        console.log('Video loading timeout reached, forcing completion');
        isVideoReady = true;
        debouncedProgressUpdate(100);
        setTimeout(() => {
          if (isVideoReady) {
            onVideoReady();
          }
        }, 500);
      }
    }, 15000); // 15 second max loading time

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('loadeddata', handleDataLoaded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('error', handleError);

    // Set video source to start loading
    video.src = videoSrc;

    // Cleanup function
    return () => {
      clearTimeout(safetyTimeout);
      
      // Clean up all timeouts
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];

      // Remove event listeners
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('loadeddata', handleDataLoaded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('error', handleError);

      // Clean up video
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [isVisible, videoSrc, onVideoReady, debouncedProgressUpdate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];
    };
  }, []);


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
          {loadingStage}
        </Typography>

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
      </Box>

      {/* Same CSS animation */}
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
