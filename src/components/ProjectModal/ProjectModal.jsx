import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Divider,
  Button
} from '@mui/material';
import { Close, Launch, GitHub, OpenInNew, Assessment } from '@mui/icons-material';

const ProjectModal = ({ project, open, onClose, onViewDetails }) => {
  if (!project) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(10, 25, 41, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          color: '#FFFFFF'
        }
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" component="h2" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
              {project.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {project.category}
            </Typography>
          </Box>
          
          <IconButton
            onClick={onClose}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { color: '#FFFFFF' }
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box
          component="img"
          src={project.image}
          alt={project.title}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
            borderRadius: 1,
            mb: 3,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            '&::selection': {
              background: 'transparent',
            },
          }}
        />

        <Typography 
          variant="body1" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 3,
            lineHeight: 1.6
          }}
        >
          {project.fullDescription}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
            Key Metrics
          </Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
            {Object.entries(project.metrics).map(([key, value]) => (
              <Box
                key={key}
                sx={{
                  backgroundColor: 'rgba(100, 255, 218, 0.05)',
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                  borderRadius: 1,
                  p: 2,
                  minWidth: 140,
                  width: 140,
                  height: 80,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(100, 255, 218, 0.1)'
                  }
                }}
              >
                <Typography variant="h6" sx={{ color: '#64ffda', fontWeight: 600, mb: 0.5 }}>
                  {value}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    textTransform: 'capitalize',
                    fontSize: '0.7rem',
                    lineHeight: 1.2
                  }}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
            Technologies Used
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {project.technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                sx={{
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  color: '#64ffda',
                  border: '1px solid rgba(100, 255, 218, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.2)'
                  }
                }}
              />
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={2}>
            {project.demoUrl ? (
              <Button
                variant="contained"
                startIcon={<Launch />}
                onClick={() => window.open(project.demoUrl, '_blank')}
                sx={{
                  backgroundColor: 'primary.main',
                  color: '#0A1929',
                  fontWeight: 600,
                  '&:hover': { 
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Live Demo
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<Assessment />}
                disabled
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  cursor: 'not-allowed',
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                No Demo Available
              </Button>
            )}
            
            {project.githubUrl ? (
              <Button
                variant="outlined"
                startIcon={<GitHub />}
                onClick={() => window.open(project.githubUrl, '_blank')}
                sx={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    color: 'primary.main'
                  }
                }}
              >
                Source Code
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<GitHub />}
                disabled
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  cursor: 'not-allowed',
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                No Code Available
              </Button>
            )}
          </Stack>

          <Button
            variant="contained"
            endIcon={<OpenInNew />}
            onClick={() => onViewDetails(project)}
            sx={{
              backgroundColor: 'primary.main',
              color: '#0A1929',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)'
              }
            }}
          >
            View Full Details
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
