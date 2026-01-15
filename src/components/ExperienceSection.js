import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import experiences from '../data/experiences';

function ExperienceSection({ mode }) {
  return (
    <Box id="experience" sx={{ minHeight: '40vh', backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000', color: mode === 'light' ? '#666666' : '#b0b0b0', display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 0, md: 0 }, py: { xs: 0, md: 0 }, gap: 6 }}>
      <Box sx={{ maxWidth: 1200, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: mode === 'light' ? '#999999' : '#ffffff', whiteSpace: 'nowrap' }}>
            Work
          </Typography>
          <Box sx={{ flex: 1, height: '1px', backgroundColor: mode === 'light' ? '#d0d0d0' : '#ffffff' }} />
        </Box>
        
        {/* Vertical Timeline - Centered with Alternating Cards */}
        <Box sx={{ position: 'relative' }}>
          {/* Timeline Line with Gradient */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '8px',
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(180deg, #3a3a3a 0%, #6b7280 30%, #9ca3af 60%, #d1d5db 100%)',
              borderRadius: '2px',
              display: { xs: 'none', md: 'block' },
            }}
          />
          
          {/* Mobile Timeline Line */}
          <Box
            sx={{
              position: 'absolute',
              left: '7px',
              top: '8px',
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(180deg, #3a3a3a 0%, #6b7280 30%, #9ca3af 60%, #d1d5db 100%)',
              borderRadius: '2px',
              display: { xs: 'block', md: 'none' },
            }}
          />
          
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            
            return (
              <Box 
                key={exp.company}
                sx={{ 
                  position: 'relative', 
                  mb: 4, 
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', md: isLeft ? 'flex-start' : 'flex-end' },
                  pl: { xs: 4, md: 0 },
                  '&:last-child': { mb: 0 }
                }}
              >
                  {/* Timeline Dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: { xs: '-3px', md: '50%' },
                      transform: { xs: 'none', md: 'translateX(-50%)' },
                      top: '20px',
                      width: { xs: '20px', md: '28px' },
                      height: { xs: '20px', md: '28px' },
                      borderRadius: '50%',
                      background: mode === 'light' 
                        ? 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #b0b0b0 100%)',
                      border: mode === 'light' ? '4px solid #F1F1F1' : '4px solid #000000',
                      boxShadow: mode === 'light' ? '0 0 0 2px #e0e0e0' : '0 0 0 2px #ffffff',
                      zIndex: 1,
                    }}
                  />
                  
                  {/* Content Card */}
                  <Box
                    sx={{
                      width: { xs: '100%', md: 'calc(50% - 60px)' },
                      backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000',
                      border: mode === 'light' ? '1px solid #d0d0d0' : '1px solid #ffffff',
                      borderRadius: 2,
                      p: 2,
                      transition: 'transform 0.3s, border-color 0.3s',
                      '&:hover': {
                        transform: { xs: 'translateX(4px)', md: isLeft ? 'translateX(-4px)' : 'translateX(4px)' },
                        borderColor: mode === 'light' ? '#999999' : '#666666',
                      },
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#6b7280' : '#ffffff', mb: 0.3, fontWeight: 600, fontSize: '0.85rem' }}>
                      {exp.date}
                    </Typography>
                    <Typography variant="h6" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 0.3, fontWeight: 600, fontSize: '1.1rem' }}>
                      {exp.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 1.5, fontWeight: 500, fontSize: '0.95rem' }}>
                      {exp.company}
                    </Typography>
                    
                    <Box component="ul" sx={{ m: 0, pl: 0, listStyleType: 'none' }}>
                      {exp.details.map((detail, i) => (
                        <Typography
                          key={i}
                          component="li"
                          sx={{
                            mb: 0.75,
                            color: mode === 'light' ? '#666666' : '#ffffff',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            '&:last-child': { mb: 0 },
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ExperienceSection; 