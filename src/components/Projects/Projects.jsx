import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Grid, Fade } from '@mui/material';
import AnimatedTitle from '../AnimatedTitle/AnimatedTitle';
import { projectsData } from '../../data/projectsData';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectModal from '../ProjectModal/ProjectModal';
import ProjectDetail from '../ProjectDetail/ProjectDetail';

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
            }}
          >
            <Tab 
              value="dataAnalysis" 
              label="Data Analysis"
              sx={{
                '&.Mui-selected': {
                  color: '#FFD700',
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
