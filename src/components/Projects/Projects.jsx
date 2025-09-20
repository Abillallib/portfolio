import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Grid, Fade, Button } from '@mui/material';
import AnimatedTitle from '../AnimatedTitle/AnimatedTitle';
import { projectsData } from '../../data/projectsData';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectModal from '../ProjectModal/ProjectModal';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import GitHubIcon from '@mui/icons-material/GitHub';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('dataAnalysis');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailView, setDetailView] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProjectPreview = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setModalOpen(false);
    setDetailView(true);
  };

  const handleBackToProjects = () => {
    setDetailView(false);
    setSelectedProject(null);
  };

  const currentProjects = projectsData[activeTab];

  if (detailView && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        pt: { xs: 4, md: 8 },
        pb: 8,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5, px: { xs: 2, sm: 3 } }}>
          <AnimatedTitle
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
              color: 'common.white',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            }}
          >
            Projects
          </AnimatedTitle>
        </Box>
        
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: 'text.secondary',
            mb: 5,
            px: { xs: 2, sm: 3 },
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Explore my latest projects showcasing data analysis and AI engineering expertise
        </Typography>

        {/* Project Category Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3
              },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                minWidth: 160,
                '&.Mui-selected': {
                  color: 'primary.main',
                },
                '&:hover': {
                  color: '#FFFFFF',
                }
              },
              '& .MuiTab-root:not(:first-of-type).Mui-selected': {
                color: 'primary.main',
              },
            }}
          >
            <Tab 
              value="dataAnalysis" 
              label="Data Analysis"
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
            <Tab 
              value="aiEngineering" 
              label="AI Engineering" 
            />
          </Tabs>
        </Box>

        {/* Project Grid */}
        <Fade in key={activeTab} timeout={500}>
          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'minmax(0, 1fr)',
                sm: 'repeat(2, minmax(300px, 1fr))',
                md: 'repeat(2, minmax(300px, 1fr))',
                lg: 'repeat(3, minmax(300px, 1fr))'
              },
              gap: { xs: 3, sm: 4 },
              px: { xs: 2, sm: 3 },
              '& > *': {
                minWidth: 0,
                display: 'flex',
                '& > *': {
                  width: '100%',
                  minHeight: '400px',
                  height: 'auto'
                }
              }
            }}
          >
            {currentProjects.map((project) => (
              <Box key={project.id}>
                <ProjectCard
                  project={project}
                  onPreview={handleProjectPreview}
                  onViewDetails={handleViewDetails}
                />
              </Box>
            ))}
          </Box>
        </Fade>

        {/* More on GitHub Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<GitHubIcon />}
            component="a"
            href="https://github.com/Abillallib"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: 'primary.main',
              color: '#0A1929',
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            VIEW MORE ON GITHUB
          </Button>
        </Box>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onViewDetails={handleViewDetails}
        />
      </Container>
    </Box>
  );
};

export default Projects;
