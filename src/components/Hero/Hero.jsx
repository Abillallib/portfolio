import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Fade,
  Slide,
  Divider
} from '@mui/material';
import VideoLoadingOverlay from '../VideoLoadingOverlay/VideoLoadingOverlay';
import useLoadingManager from '../../hooks/useLoadingManager';
import { detectBrowser } from '../../utils/browserDetection';
import { logVideoSelection } from '../../utils/videoTest';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('analyst');

  const handleTabChange = (_e, value) => setActiveTab(value);

  const contentMap = {
    analyst: 'I translate complex data into clear, actionable insights that drive business outcomes.',
    engineer: 'I build intelligent tools and automation that scale insights and streamline workflows.',
  };

  // Browser detection for optimal video format - MEMOIZED to prevent re-renders
  const browserInfo = useMemo(() => {
    // console.log('🔍 BROWSER DETECTION: Running detection (should only see this once)');
    return detectBrowser();
  }, []); // Empty dependency array - only run once

  // Log video selection once - MEMOIZED to prevent re-renders
  useMemo(() => {
    // console.log('📋 VIDEO SELECTION: Logging selection (should only see this once)');
    logVideoSelection(browserInfo);
  }, [browserInfo]); // Only re-run if browserInfo changes (which it won't)

  // Select video source based on browser detection - MEMOIZED to prevent re-computation
  const videoSrc = useMemo(() => {
    const webmSrc = `${import.meta.env.BASE_URL}images/projects/hero/hero-video.webm`;
    const mp4Src = `${import.meta.env.BASE_URL}images/projects/hero/hero-video-ios.mp4`;

    // Use WEBM for Chrome/Android, MP4 for iOS/Safari, MP4 as fallback
    const selectedSrc = browserInfo.videoFormat === 'mov' ? webmSrc : mp4Src;
    // console.log('🎬 VIDEO SOURCE SELECTED:', selectedSrc);
    return selectedSrc;
  }, [browserInfo]); // Only re-compute if browserInfo changes

  // Simplified loading system - single source of truth
  const {
    videoRef,
    isLoading,
    isVisible,
    showHero,
    progress,
    error,
    retry
  } = useLoadingManager(videoSrc);

  return (
    <>
      {/* Loading Overlay */}
      <VideoLoadingOverlay
        isVisible={isVisible}
        progress={progress}
        error={error}
        onRetry={retry}
      />

      <Box
        component="section"
        sx={{
          minHeight: { xs: '85vh', md: '100vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'transparent',
          position: 'relative',
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 4 },
          maxWidth: '2000px',
          mx: 'auto',
          zIndex: 2,
          pb: { xs: 8, md: 0 },
          opacity: showHero ? 1 : 0, // Simple visibility control
          transition: 'opacity 800ms ease-in-out' // Smooth fade-in
        }}
      >
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 4, md: 6 },
        width: '100%',
        maxWidth: '1400px',
        alignItems: 'flex-start',
        // Removed pt: { xs: 4, md: 8 } to move video closer to top
      }}>
        {/* Video Column */}
        <Box 
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: '100%', md: '700px' }, // Increased from 600px to 700px
            overflow: 'hidden',
            marginTop: { xs: 0, md: 2.5 }, // 10px on md screens (2.5 * 4px = 10px)
            '@media (min-width: 900px) and (max-width: 1199px)': {
              transform: 'scale(1.05)',
              transformOrigin: 'left top',
              marginLeft: '-5px', // Compensate for the scale transform
            },
            '&::before': {
              content: '""',
              display: 'block',
              paddingBottom: 'calc(56.25% - 1px)', // 16:9 ratio minus 1px
            },
            '& video': {
              position: 'absolute',
              top: { xs: '8px', md: '10px' }, // Match the 10px margin on md screens
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 2,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              pointerEvents: 'none',
              '&::-webkit-media-controls': {
                display: 'none !important',
              },
              '&::-webkit-media-controls-panel': {
                display: 'none !important',
              },
              '&::-webkit-media-controls-play-button': {
                display: 'none !important',
              },
              '&::-webkit-media-controls-start-playback-button': {
                display: 'none !important',
              },
            },
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            style={{
              position: 'absolute',
              top: '8px',
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            {/* Primary video source based on browser detection */}
            <source
              src={videoSrc}
              type={browserInfo.videoFormat === 'mov' ? 'video/webm' : 'video/mp4'}
            />
            {/* Fallback sources for maximum compatibility */}
            <source src={`${import.meta.env.BASE_URL}images/projects/hero/hero-video-ios.mp4`} type="video/mp4" />
            <source src={`${import.meta.env.BASE_URL}images/projects/hero/hero-video.webm`} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </Box>

        {/* Content Column */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: '600px',
            mx: 'auto',
            '& > * + *': {
              mt: 3
            }
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.2rem', sm: '2.7rem', md: '3rem' },
              lineHeight: 1.1,
              mb: 2,
              background: 'linear-gradient(90deg, #fff 0%, #b3b3b3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Adjaynae Billings
          </Typography>
          
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="role tabs"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: '3px',
              },
              '& .MuiTab-root': {
                color: 'text.secondary',
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                minWidth: '120px',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
              '& .MuiTab-root:not(:first-of-type).Mui-selected': {
                color: 'primary.main',
              },
            }}
          >
            <Tab 
              value="analyst" 
              label="Data Analyst"
              sx={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
                color: '#1a237e !important',
                fontWeight: '600 !important',
                borderRadius: 1,
                mx: 0.5,
                '&:hover': {
                  background: 'linear-gradient(135deg, #FFE55C 0%, #FFB347 50%, #FF9500 100%)',
                  color: '#1a237e !important',
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
                  color: '#1a237e !important',
                },
                '& .MuiTab-wrapper': {
                  color: '#1a237e !important',
                },
                '& span': {
                  color: '#1a237e !important',
                },
              }}
            />
            <Tab value="engineer" label="AI Engineer" />
          </Tabs>

          <Fade in key={activeTab} timeout={400}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                lineHeight: 1.6,
                mt: 2
              }}
            >
              {contentMap[activeTab]}
            </Typography>
          </Fade>
        </Box>
      </Box>
      
      <Divider 
        sx={{
          width: '90%',
          mx: 'auto',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          mt: { xs: 12, md: 8 },
          mb: { xs: 8, md: 6 } // 64px mobile, 48px desktop - reduced for mobile
        }}
      />
    </Box>
  </>
  );
};

export default React.memo(Hero);
