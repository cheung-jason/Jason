import React from 'react';
import Box from '@mui/material/Box';

function Footer({ mode }) {
  const currentYear = new Date().getFullYear();
  const lastUpdated = 'January 14, 2026'; // Update this date before each git push
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        width: '100%', 
          py: 3, 
          textAlign: 'center', 
          backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000', 
          color: mode === 'light' ? '#666666' : '#ffffff',
        fontSize: '1rem', 
        mt: 'auto'
      }}
    >
      © Copyright {currentYear}, Jason Cheung | Last updated: {lastUpdated}
    </Box>
  );
}

export default Footer;

