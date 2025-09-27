import React, { useMemo, useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Fade, Button } from '@mui/material';
import AnimatedTitle from '../AnimatedTitle/AnimatedTitle';
import { projectsData } from '../../data/projectsData';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectModal from '../ProjectModal/ProjectModal';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import GitHubIcon from '@mui/icons-material/GitHub';
import usePreloadImages from '../../hooks/usePreloadImages';
import useHeroReady from '../../hooks/useHeroReady';

const Projects = () => {
  const tabConfig = useMemo(
    () => [
      { value: 'dataAnalysis', label: 'Data Analysis' },
      { value: 'aiEngineering', label: 'AI Engineering' }
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(() => tabConfig[0].value);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const heroReady = useHeroReady();

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

  const projectGroups = useMemo(
    () =>
      tabConfig.map(({ value, label }) => ({
        value,
        label,
        projects: projectsData[value] || [],
      })),
    [tabConfig]
  );

  const projectImageUrls = useMemo(
    () => projectGroups.flatMap(({ projects }) => projects.map((project) => project.image)),
    [projectGroups]
  );

  usePreloadImages(projectImageUrls, { delay: 250, enabled: heroReady });

  if (detailView && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 4, md: 8 },
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
            {tabConfig.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                sx={{
                  mx: 0.5,
                  ...(tab.value === 'dataAnalysis' && {
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
                    color: '#1a237e !important',
                    fontWeight: '600 !important',
                    borderRadius: 1,
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
                  }),
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Project Grids */}
        <Box
          sx={{
            position: 'relative',
            minHeight: { xs: 450, sm: 520 },
          }}
        >
          {projectGroups.map(({ value, projects }) => (
            <Fade
              key={value}
              in={activeTab === value}
              timeout={500}
              mountOnEnter={false}
              unmountOnExit={false}
            >
              <Box
                sx={{
                  position: activeTab === value ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  opacity: activeTab === value ? 1 : 0,
                  visibility: activeTab === value ? 'visible' : 'hidden',
                  pointerEvents: activeTab === value ? 'auto' : 'none',
                  transition: 'opacity 0.5s ease, visibility 0.5s ease',
                }}
              >
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
                  {projects.map((project) => (
                    <Box key={project.id}>
                      <ProjectCard
                        project={project}
                        onPreview={handleProjectPreview}
                        onViewDetails={handleViewDetails}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Fade>
          ))}
        </Box>

        {/* More on GitHub Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
          <Button
            variant="contained"
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
