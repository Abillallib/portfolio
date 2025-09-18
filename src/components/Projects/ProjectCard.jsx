import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Box,
} from '@mui/material';

const ProjectCard = ({ project }) => {
  const { image, title, description, tags = [] } = project || {};

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        bgcolor: 'rgba(10, 25, 41, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 30px rgba(100, 255, 218, 0.3)',
          borderColor: 'rgba(100, 255, 218, 0.3)',
          '& .project-image': {
            transform: 'scale(1.05)'
          },
          '&::after': {
            opacity: 1
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '12px',
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(100,255,218,0.4) 0%, rgba(100,255,218,0.1) 50%, rgba(0,0,0,0) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          opacity: 0.5,
          transition: 'opacity 0.3s ease'
        },
        '& .MuiCardContent-root': {
          p: 0,
          '&:last-child': { 
            paddingBottom: 0
          }
        },
        position: 'relative'
      }}
    >
      {/* Image with gradient overlay - fixed height */}
      <Box 
        className="project-image"
        sx={{ 
          position: 'relative',
          width: '100%',
          height: '300px', // Fixed height for image
          overflow: 'hidden'
        }}
      >
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
          />
        )}
        {/* Gradient overlay */}
        <Box 
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(10,25,41,0.9) 0%, rgba(10,25,41,0.7) 40%, transparent 100%)',
          }}
        />
      </Box>

      {/* Content Section - compact */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1
      }}>
        <Box>
          <Typography 
            variant="subtitle1" 
            component="h3" 
            sx={{ 
              fontWeight: 600,
              color: 'common.white',
              mb: 1,
              lineHeight: 1.2
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              mb: 0
            }}
          >
            {description}
          </Typography>
        </Box>

        {tags?.length > 0 && (
          <Stack 
            direction="row" 
            spacing={0.5}
            flexWrap="wrap" 
            useFlexGap 
            sx={{ 
              mb: 1.5,
              '& .MuiChip-root': {
                height: 22,
                fontSize: '0.7rem',
                '& .MuiChip-label': {
                  px: 1
                }
              }
            }}
          >
            {tags.map((tag, idx) => (
              <Chip 
                key={`${title}-tag-${idx}`} 
                label={tag} 
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  fontSize: '0.7rem',
                  height: 24,
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.08)'
                  }
                }}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    liveUrl: PropTypes.string,
    sourceUrl: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
