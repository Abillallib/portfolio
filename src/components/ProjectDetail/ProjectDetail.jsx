import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton
} from '@mui/material';
import { ArrowBack, Launch, GitHub, TrendingUp, Category as CategoryIcon, Assessment } from '@mui/icons-material';

const ProjectDetail = ({ project, onBack }) => {
  if (!project) return null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'transparent',
        py: 8,
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 3,
              '&:hover': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Back to Projects
          </Button>

          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 3
            }}
          >
            {project.category}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            {project.demoUrl && project.demoUrl !== '#' ? (
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
                View Code
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
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Project Image */}
            <Box sx={{ 
              width: '100%',
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              mb: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              '&::before': {
                content: '""',
                display: 'block',
                paddingBottom: '56.25%' /* 16:9 Aspect Ratio */
              }
            }}>
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  '&::selection': {
                    background: 'transparent',
                  },
                }}
              />
            </Box>

            {/* Overview */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  mb: 3
                }}
              >
                Project Overview
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.7,
                  fontSize: '1.1rem'
                }}
              >
                {project.fullDescription}
              </Typography>
            </Box>

            {/* Challenges & Solution */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Challenges & Solution
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6,
                    mb: 2
                  }}
                >
                  {project.challenges}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line'
                  }}
                  dangerouslySetInnerHTML={{ __html: project.solution.replace(/\n\n/g, '<br/><br/>') }}
                />
              </Box>
            </Box>

            {/* Results */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Results & Impact
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.6
                }}
              >
                {project.results}
              </Typography>
            </Box>

            {/* Key Takeaways */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Key Takeaways
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.7,
                  '& strong': {
                    color: '#64ffda',
                    fontWeight: 600
                  }
                }}
              >
                {project.keyTakeaways || 'Key insights and lessons learned from this project will be displayed here.'}
              </Typography>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Key Metrics */}
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                mb: 3
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 600,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Assessment sx={{ color: '#64ffda' }} />
                  Key Metrics
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <Box
                      key={key}
                      sx={{
                        backgroundColor: 'rgba(100, 255, 218, 0.05)',
                        border: '1px solid rgba(100, 255, 218, 0.1)',
                        borderRadius: 1,
                        p: 2,
                        minWidth: 120,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(100, 255, 218, 0.1)'
                        }
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#64ffda', fontWeight: 600 }}>
                        {value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                mb: 3
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 600,
                    mb: 3
                  }}
                >
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
                        mb: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(100, 255, 218, 0.2)'
                        }
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  Project Info
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CategoryIcon sx={{ color: '#2196F3' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Category
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                        {project.category}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingUp sx={{ color: '#64ffda' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Status
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: project.status === 'In Progress' ? '#FFFFFF' : '#64ffda',
                        fontWeight: 500
                      }}>
                        {project.status || 'Completed'}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Bottom Navigation */}
        <Box sx={{
          mt: 6,
          pt: 4,
          textAlign: 'center'
        }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1rem',
              fontWeight: 500,
              py: 1.5,
              px: 3,
              '&:hover': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            ← Back to Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectDetail;
