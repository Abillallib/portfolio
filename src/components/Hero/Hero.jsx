import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Fade, Slide, Divider } from '@mui/material';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('analyst');

  const handleTabChange = (_e, value) => setActiveTab(value);

  const contentMap = {
    analyst: 'I translate complex data into clear, actionable insights that drive business outcomes.',
    engineer: 'I build intelligent tools and automation that scale insights and streamline workflows.',
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        position: 'relative',
        py: 0,
        px: { xs: 2, sm: 4 },
        maxWidth: '2000px',
        mx: 'auto',
        zIndex: 2,
      }}
    >
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 4, md: 6 },
        width: '100%',
        maxWidth: '1400px',
        alignItems: 'flex-start',
        pt: { xs: 4, md: 8 }
      }}>
        {/* Video Column */}
        <Box 
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: '100%', md: '700px' }, // Increased from 600px to 700px
            overflow: 'hidden',
            marginTop: { xs: 2, md: 2.5 }, // 10px on md screens (2.5 * 4px = 10px)
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
              height: 'calc(100% + 1px)',
              objectFit: 'cover',
              objectPosition: 'center top',
              transform: 'translateY(-0.5px)',
              overflow: 'hidden',
            },
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => console.error('Video error:', e)}
            onEnded={(e) => {
              console.log('Video ended, restarting...');
              e.target.currentTime = 0;
              e.target.play().catch(e => console.error('Error replaying video:', e));
            }}
            onCanPlay={(e) => {
              console.log('Video can play, starting...');
              e.target.play().catch(e => console.error('Error playing video:', e));
            }}
          >
            <source src="/images/projects/hero/hero-video.webm" type="video/webm" />
            <source src="/images/projects/hero/hero-video.mp4" type="video/mp4" />
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
            }}
          >
            <Tab value="analyst" label="Data Analyst" />
            <Tab value="engineer" label="AI Engineer" />
          </Tabs>

          <Fade in key={activeTab} timeout={400}>
            <Slide in key={activeTab} direction="up" timeout={400} mountOnEnter unmountOnExit>
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
            </Slide>
          </Fade>
        </Box>
      </Box>
      
      <Divider 
        sx={{
          width: '90%',
          mx: 'auto',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          mt: 'auto',
          mb: 0
        }}
      />
    </Box>
  );
};

export default Hero;
