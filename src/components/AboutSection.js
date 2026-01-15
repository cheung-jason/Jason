import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function AboutSection({ mode }) {
  return (
    <Box
      id="about"
      sx={{
        minHeight: '60vh',
        backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000',
        color: mode === 'light' ? '#666666' : '#b0b0b0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 0, md: 0 },
        py: { xs: 0, md: 0 }
      }}
    >
      <Box sx={{ maxWidth: 1200, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: mode === 'light' ? '#999999' : '#ffffff', whiteSpace: 'nowrap' }}>
            About
          </Typography>
          <Box sx={{ flex: 1, height: '1px', backgroundColor: mode === 'light' ? '#d0d0d0' : '#ffffff' }} />
        </Box>
        <Typography variant="h7" sx={{ mb: 0, color: mode === 'light' ? '#666666' : '#ffffff', fontWeight: 700 }}>
          Hello
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.15rem' }, color: mode === 'light' ? '#666666' : '#ffffff' }}>
          Biology meets big data. Jason holds a Master's in Bioinformatics from Johns Hopkins and is passionate about using his skills to fuel scientific discovery and make a difference in the biomedical research space. As a scientific data analyst at the National Center for Advancing Translational Sciences (NCATS), he is developing bioinformatics tools to accelerate the discovery of new therapies to treat rare disorders.
        </Typography>
        <Typography variant="h7" sx={{ mb: 0, color: mode === 'light' ? '#666666' : '#ffffff', fontWeight: 700 }}>
          Professionally
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.15rem' }, color: mode === 'light' ? '#666666' : '#ffffff' }}>
        Jason cares deeply about details, critical thinking, and creativity. He has expertise in extracting insights from complex datasets, coordinating cross-functional teams, and developing bioinformatics tools to advance translational science. His scientific curiosity extends to protein structure, function, and design, as well as their many applications through data science, machine learning, and AI.
        </Typography>
        <Typography variant="h7" sx={{ mb: 0, color: mode === 'light' ? '#666666' : '#ffffff', fontWeight: 700 }}>
          Elsewhere
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.15rem' }, color: mode === 'light' ? '#666666' : '#ffffff' }}>
          Work life balance helps people stay mentally and physically healthy by reducing stress and boosting productivity. It fuels focus, energy, and brain power. People then return to work more energized and clear minded. Jason is no exception – his passion for science thrives when he feels rested and at 100%. In his free time, he enjoys hanging out with his dog, sipping coffee, and breaking a sweat at the gym. Check out some of his hobbies{' '}
          <Box
            component="a"
            href="#/blog"
            sx={{
              textDecoration: 'none',
              color: mode === 'light' ? '#666666' : '#ffffff',
              fontStyle: 'italic',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              '&:hover .arrow': {
                transform: 'translateX(4px)',
              }
            }}
          >
            <span style={{ fontStyle: 'italic' }}>here</span>
            <Box 
              component="span" 
              className="arrow"
              sx={{ 
                display: 'inline-block',
                transition: 'transform 0.2s ease',
              }}
            >
              →
            </Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default AboutSection;
