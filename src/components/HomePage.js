import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import AboutSection from './AboutSection';
import CapabilitiesSection from './CapabilitiesSection';
import InterestsMapSection from './InterestsMapSection';
import ExperienceSection from './ExperienceSection';
import Footer from './Footer';
import { Helmet } from "react-helmet";

function HomePage({ mode }) {
  const location = useLocation();
  
  React.useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);
  
  return (
    <Box sx={{ backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000' }}>
      <Helmet>
      <title>Jason Cheung</title>
      <meta name="description" content="Portfolio homepage for Jason Cheung" />
      </Helmet>
      <Box
        id="intro"
        sx={{
          minHeight: '100vh',
          background: mode === 'light' 
            ? 'linear-gradient(to bottom, #fff 0%, #ffffff 44.5%, #F1F1F1 44.5%, #F1F1F1 100%)'
            : '#000000',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2
        }}
      >
          {/* Vertical Section Header */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            flexDirection: 'row', 
            alignItems: 'center', 
            mr: 4,
            gap: 2
          }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '1.15rem', 
                color: mode === 'light' ? '#999999' : '#ffffff', 
                whiteSpace: 'nowrap',
                transform: 'rotate(-90deg)',
                transformOrigin: 'right',
                mt: -25
              }}
            >
              Who
              </Typography>
            <Box sx={{ width: '1px', height: '200px', backgroundColor: mode === 'light' ? '#d0d0d0' : '#ffffff' }} />
          </Box>

          {/* Main Content Container */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: 600,
              flex: 1,
            }}
          >
            <Typography variant="h2" sx={{ mb: 0, color: mode === 'light' ? '#000000' : '#ffffff', fontWeight: 700 }}>Jason Cheung</Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, color: mode === 'light' ? '#666666' : '#ffffff', fontWeight: 200 }}>Scientific Data Analyst, NCATS</Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.15rem' }, color: mode === 'light' ? '#666666' : '#ffffff', maxWidth: 800 }}>Exploring new and renewed ideas for how data and data systems can better serve rare disease communities – harmonizing, integrating, and catalyzing the discovery of new treatments for rare diseases.</Typography>
          </Box>
          <Avatar alt="Jason's Profile Picture" src={process.env.PUBLIC_URL + "/profile.JPG"} sx={{ width: { xs: 220, md: 320 }, height: { xs: 220, md: 320 }, ml: { md: 8 }, mt: { xs: 5, md: 0 }, borderRadius: '24px' }} />
          </Box>
      </Box>
      <AboutSection mode={mode} />
      <ExperienceSection mode={mode} />
      <CapabilitiesSection mode={mode} />
      <InterestsMapSection mode={mode} />
      <Footer mode={mode} />
    </Box>
  );
}

export default HomePage;