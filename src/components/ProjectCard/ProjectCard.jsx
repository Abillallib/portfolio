import React, { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  Stack,
  Tooltip
} from '@mui/material';
import { Launch, GitHub, Visibility } from '@mui/icons-material';

const ProjectCard = ({ project = {}, onPreview, onViewDetails }) => {
  // Destructure with default values to prevent errors
  const { 
    title = '', 
    shortDescription = '', 
    technologies = [], 
    category = '', 
    metrics = {},
    image = '',
    githubUrl = '#'
  } = project;

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '400px',
        borderRadius: 3,
        bgcolor: 'rgba(10, 25, 41, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
        position: 'relative',
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
        }
      }}
      onClick={() => onPreview && onPreview(project)}
    >
      <Box 
        className="project-image"
        sx={{ 
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 aspect ratio (9/16 = 0.5625)
          height: 0,
          overflow: 'hidden'
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onLoad={() => setImageLoaded(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease, transform 0.5s ease',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            pointerEvents: 'none',
            '&::selection': {
              background: 'transparent',
            },
          }}
        />
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
      
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1,
        flexGrow: 1
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle1" 
              component="h3"
              sx={{ 
                fontWeight: 600,
                color: 'common.white',
                lineHeight: 1.2,
                mb: 0.5
              }}
            >
              {title || 'Project Title'}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(category || '').split(',').map((cat, index) => (
                <Chip
                  key={index}
                  label={cat.trim()}
                  size="small"
                  sx={{
                    background: 'linear-gradient(90deg, rgba(76, 175, 80, 0.1) 0%, rgba(46, 125, 50, 0.15) 50%, rgba(76, 175, 80, 0.1) 100%)',
                    color: '#4CAF50',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    fontSize: '0.6rem',
                    height: 20,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      '&::before': {
                        transform: 'translateX(100%)',
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transition: 'transform 0.7s ease',
                    },
                    '& .MuiChip-label': {
                      px: 0.75,
                      py: 0.25,
                      position: 'relative',
                      zIndex: 1,
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '3.2em'
          }}
        >
          {shortDescription}
        </Typography>

        <Stack 
          direction="row" 
          spacing={0.5}
          flexWrap="wrap" 
          useFlexGap 
          sx={{ 
            mt: 1,
            mb: 1.5,
            '& .MuiChip-root': {
              height: 22,
              fontSize: '0.7rem',
              '& .MuiChip-label': {
                px: 0.75,
                py: 0.25
              }
            }
          }}
        >
          {technologies.slice(0, 3).map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              sx={{
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                color: '#64ffda',
                border: '1px solid rgba(100, 255, 218, 0.3)',
                fontSize: '0.6rem',
                height: 20,
                '& .MuiChip-label': {
                  px: 0.75,
                  py: 0.25
                }
              }}
            />
          ))}
          {technologies.length > 3 && (
            <Chip
              label={`+${technologies.length - 3}`}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.75rem'
              }}
            />
          )}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          {project.githubUrl ? (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank');
              }}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <GitHub fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              disabled
              sx={{
                color: 'rgba(255, 255, 255, 0.3)',
                cursor: 'not-allowed',
                '&.Mui-disabled': {
                  color: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              <GitHub fontSize="small" />
            </IconButton>
          )}

          <Tooltip title="View Project" arrow>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onViewDetails(project);
              }}
              sx={{
                color: 'primary.main',
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.2)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default ProjectCard;
