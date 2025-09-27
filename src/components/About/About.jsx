import React, { useMemo, useState } from 'react';
import { Container, Typography, Grid, Box, Card, CardContent, Tabs, Tab, Stack } from '@mui/material';
import AnimatedTitle from '../AnimatedTitle/AnimatedTitle';
import BarChartIcon from '@mui/icons-material/BarChart';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import InsightsIcon from '@mui/icons-material/Insights';
import TableChartIcon from '@mui/icons-material/TableChart';
import JavascriptIcon from '@mui/icons-material/Javascript';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import GitHubIcon from '@mui/icons-material/GitHub';
import ScienceIcon from '@mui/icons-material/Science';
import SkillCard from './SkillCard';
import usePreloadImages from '../../hooks/usePreloadImages';
import useHeroReady from '../../hooks/useHeroReady';

// Technical skills categorized into groups
const skills = {
  'Data & Analytics': [
    { name: 'SQL', subtitle: 'Databases', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Tableau', subtitle: 'Data Visualization', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg' },
    { name: 'Excel', subtitle: 'Spreadsheets', iconUrl: 'https://img.icons8.com/color/48/microsoft-excel-2019.png' },
    { name: 'Power BI', subtitle: 'Business Intelligence', iconUrl: 'https://img.icons8.com/color/48/power-bi.png' },
    { name: 'Power Query', subtitle: 'Data Preparation', iconUrl: 'https://img.icons8.com/color/48/microsoft.png' },
    { name: 'Pandas', subtitle: 'Data Analysis', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'R', subtitle: 'Statistical Computing', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
  ],
  'Programming & Automation': [
    { name: 'Python', subtitle: 'Automation & Analytics', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript (React)', subtitle: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Web Scraping', subtitle: 'Automation', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
    { name: 'Power Automate', subtitle: 'Workflow Automation', iconUrl: 'https://img.icons8.com/color/48/microsoft-power-automate.png' },
    { name: 'n8n', subtitle: 'Workflow Automation', iconUrl: 'https://docs.n8n.io/favicon.ico' },
    { name: 'Power Apps', subtitle: 'Low-code Apps', iconUrl: 'https://img.icons8.com/color/48/microsoft-power-apps.png' },
  ],
  Tools: [
    { name: 'Git & GitHub', subtitle: 'Version Control', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Jupyter Notebook', subtitle: 'Prototyping', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    { name: 'VS Code', subtitle: 'Editor', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Asana', subtitle: 'Project Management', iconUrl: 'https://img.icons8.com/color/48/asana.png' },
    { name: 'Jira', subtitle: 'Issue Tracking', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
  ],
};

const About = () => {
  const categories = useMemo(() => Object.keys(skills), []);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const heroReady = useHeroReady();

  // Map specific skills to representative MUI icons (approximations where exact brand icons don't exist)
  const skillIconMap = {
    SQL: <StorageIcon fontSize="small" />,
    Tableau: <InsightsIcon fontSize="small" />,
    Excel: <TableChartIcon fontSize="small" />,
    'Power BI': <BarChartIcon fontSize="small" />,
    Python: <ScienceIcon fontSize="small" />,
    'JavaScript (React)': <JavascriptIcon fontSize="small" />,
    'Web Scraping': <TravelExploreIcon fontSize="small" />,
    'Git & GitHub': <GitHubIcon fontSize="small" />,
    'Jupyter Notebook': <ScienceIcon fontSize="small" />,
    'VS Code': <CodeIcon fontSize="small" />,
  };

  const CategoryIcon = ({ name }) => {
    if (name === 'Data & Analytics') return <BarChartIcon />;
    if (name === 'Programming & Automation') return <CodeIcon />;
    return <BuildIcon />;
  };

  // Map skill to Simple Icons slug
  const skillSlugMap = {
    SQL: 'postgresql',
    Tableau: 'tableau',
    Excel: 'microsoftexcel',
    'Power BI': 'powerbi',
    Python: 'python',
    'JavaScript (React)': 'react',
    'Web Scraping': 'selenium',
    'Git & GitHub': 'github',
    'Jupyter Notebook': 'jupyter',
    'VS Code': 'visualstudiocode',
    Pandas: 'pandas',
  };

  const iconUrlFor = (slugOrUrl) => slugOrUrl;

  const skillGroups = useMemo(
    () =>
      categories.map((category) => ({
        category,
        skills: skills[category],
        iconUrls: skills[category].map((skill) => iconUrlFor(skill.iconUrl)),
      })),
    [categories]
  );

  const skillIconUrls = useMemo(
    () => skillGroups.flatMap(({ iconUrls }) => iconUrls),
    [skillGroups]
  );

  usePreloadImages(skillIconUrls, { delay: 300, enabled: heroReady });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
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
          About Me
        </AnimatedTitle>
      </Box>

      <Grid container spacing={3}>
        {/* Bio column */}
        <Grid item xs={12} md={7}>
          <Typography variant="body1" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            I believe the most powerful stories are told with data. My mission is to find those stories and build the intelligent tools that bring them to life.
          </Typography>
          <Typography paragraph>
           I approach this mission with two distinct hats. As a Data Analyst, I dive deep into complex datasets to uncover the 'why' behind the numbers, creating clear visualizations and dashboards in Power BI and Tableau that drive business decisions. 
           As an AI Engineer, I build the 'how'—designing automated pipelines and intelligent applications that make those insights scalable and accessible.
          </Typography>
          <Typography paragraph>
           This passion for building and problem-solving is deeply personal. Whether it's engineering an automated data pipeline to analyze the Jamaican stock market or developing an AI model to generate an authentic Jamaican voice, I'm constantly driven by a curiosity to see how technology can solve unique challenges, especially for our region.
          </Typography>
          <Typography paragraph>
            When I am not analyzing data, I explore new technologies and refine my craft. If you're looking for a creative problem-solver with a passion for building data-driven solutions, I'd love to connect.
          </Typography>
        </Grid>

        {/* Skills column */}
        <Grid item xs={12} md={5}>
          <Stack spacing={2}>
            <Tabs
              value={activeCategory}
              onChange={(_, v) => setActiveCategory(v)}
              variant="fullWidth"
              aria-label="skills categories"
              sx={{ 
                mb: 2,
                '& .MuiTab-root': {
                  fontSize: { xs: '0.8rem', sm: '1.1rem' },
                  fontWeight: 600,
                  minHeight: 48,
                  px: { xs: 0.5, sm: 1 },
                  whiteSpace: 'nowrap',
                  minWidth: 'auto',
                  '&.Mui-selected': {
                    color: 'primary.main'
                  }
                }
              }}
            >
              {categories.map((cat) => (
                <Tab 
                  key={cat} 
                  value={cat} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                      {cat === 'Data & Analytics' && <BarChartIcon fontSize="small" />}
                      {cat === 'Programming & Automation' && <CodeIcon fontSize="small" />}
                      {cat === 'Tools' && <BuildIcon fontSize="small" />}
                      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{cat}</Box>
                      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        {cat === 'Data & Analytics' && 'Data'}
                        {cat === 'Programming & Automation' && 'Code'}
                        {cat === 'Tools' && 'Tools'}
                      </Box>
                    </Box>
                  } 
                />
              ))}
            </Tabs>

            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(6px)',
                border: '1px solid',
                borderColor: 'rgba(255,255,255,0.12)'
              }}
            >
              <CardContent sx={{ position: 'relative', minHeight: 0 }}>
                <Box sx={{ position: 'relative', minHeight: 0 }}>
                  {skillGroups.map(({ category, skills: categorySkills }) => (
                    <Box
                      key={category}
                      sx={{
                        position: activeCategory === category ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: activeCategory === category ? 1 : 0,
                        visibility: activeCategory === category ? 'visible' : 'hidden',
                        pointerEvents: activeCategory === category ? 'auto' : 'none',
                        transition: 'opacity 0.4s ease, visibility 0.4s ease',
                      }}
                    >
                      <Grid container spacing={2}>
                        {categorySkills.map((skill) => (
                          <Grid
                            key={`${category}-${skill.name}`}
                            item
                            xs={12}
                            sm={6}
                            sx={{ display: 'flex' }}
                          >
                            <SkillCard
                              iconUrl={iconUrlFor(skill.iconUrl)}
                              title={skill.name}
                              subtitle={skill.subtitle}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
