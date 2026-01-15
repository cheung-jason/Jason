import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CapabilitiesSection({ mode }) {
  const capabilities = [
    'Python',
    'R',
    'Javascript',
    'SQL',
    'AI/Machine Learning',
    'Network Analysis',
    'Data Visualization Tools',
    'Git/Version Control',
    'Web Design',
    'Project Management',
    'Scientific Communication',
    'Protein Science',
    'Analytical Science',
    'GMP/GLP'
  ];

  return (
    <Box
      id="capabilities"
      sx={{
        minHeight: '30vh',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: mode === 'light' ? '#999999' : '#ffffff', whiteSpace: 'nowrap' }}>
            Capabilities
          </Typography>
          <Box sx={{ flex: 1, height: '1px', backgroundColor: mode === 'light' ? '#d0d0d0' : '#ffffff' }} />
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          {capabilities.map((capability, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000',
                borderRadius: '50px',
                border: mode === 'light' ? '1px solid #d0d0d0' : '1px solid #ffffff',
                px: 3,
                py: 1.5,
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: mode === 'light' ? '#999999' : '#ffffff'
                }
              }}
            >
              <Typography variant="subtitle1" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', fontWeight: 500, whiteSpace: 'nowrap' }}>
                {capability}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CapabilitiesSection;

