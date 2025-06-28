import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import FadeInSection from './FadeInSection';
import ExperienceSection from './ExperienceSection';

function HomePage() {
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
    <>
      <FadeInSection>
        <Box
          id="home"
          sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            color: 'text.primary',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            mb: { xs: 10, md: 12 }
          }}
        >
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
            <FadeInSection delay={0}><Typography variant="h4" sx={{ mb: 3, color: '#ccd6f6', fontWeight: 700 }}>Hey there!</Typography></FadeInSection>
            <FadeInSection delay={150}><Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.15rem' }, color: '#e6f1ff', maxWidth: 800 }}>Hi, I'm Jason, a scientific data analyst, passionate for leveraging data analytics and project management to drive impactful outcomes in the rare disease space. I possess strong interpersonal and oral communication skills acquired through presentations, teaching, and mentoring.</Typography></FadeInSection>
            <FadeInSection delay={300}><Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', fontSize: { xs: '1rem', md: '1rem' }, color: '#90a4ae', maxWidth: 800 }}>Learn more about me!{' '}
              <Link
                component="button"
                underline="always"
                sx={{ color: '#90a4ae', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', p: 0 }}
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start here
              </Link>
            </Typography></FadeInSection>
          </Box>
          <FadeInSection delay={450}><Avatar alt="Jason's Profile Picture" src={process.env.PUBLIC_URL + "/profile.JPG"} sx={{ width: { xs: 220, md: 320 }, height: { xs: 220, md: 320 }, ml: { md: 8 }, mt: { xs: 5, md: 0 }, borderRadius: '24px', transition: 'transform 0.2s', '&:hover': { animation: 'shake 0.2s' } }} /></FadeInSection>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box id="about" sx={{ minHeight: '60vh', backgroundColor: '#0a192f', color: '#e6f1ff', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', px: { xs: 2, md: 8 }, py: { xs: 6, md: 10 }, mb: { xs: 10, md: 12 } }}>
          <FadeInSection delay={0}><Typography variant="h3" sx={{ mb: 3, color: '#90a4ae', fontWeight: 700 }}>/ about me</Typography></FadeInSection>
          <FadeInSection delay={150}><Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.15rem' }, color: '#e6f1ff', maxWidth: 800 }}>Biology meets big data. Jason holds a Master's in Bioinformatics from Johns Hopkins and is passionate about using his skills to fuel scientific discovery and make a difference in the biomedical research space.</Typography></FadeInSection>
          <FadeInSection delay={300}><Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.15rem' }, color: '#e6f1ff', maxWidth: 800 }}>Jason is a scientific data analyst at the National Center for Advancing Translational Sciences (NCATS), where he is working on developing bioinformatics tools to accelerate the discovery of new therapies to treat rare disorders.</Typography></FadeInSection>
          <FadeInSection delay={450}><Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: '#e6f1ff', maxWidth: 800 }}>Experienced in extracting insights from complex datasets, coordinating cross-functional teams, and developing bioinformatics tools to advance translational science. His scientific curiosity extends to exploring protein structure, function, design, and their diverse applications using data science, machine learning, and AI.</Typography></FadeInSection>
          <FadeInSection delay={450}><Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: '#e6f1ff', maxWidth: 800 }}>Experienced in extracting insights from complex datasets, coordinating cross-functional teams, and developing bioinformatics tools to advance translational science. His scientific curiosity extends to exploring protein structure, function, design, and their diverse applications using data science, machine learning, and AI. Based in the DMV area and loves to see the world. He loves dogs, coffee, and fitness. Check out some of his hobbies <a href="#/blog" style={{ textDecoration: 'underline', color: '#90a4ae', fontStyle: 'italic' }}><span style={{ fontStyle: 'italic' }}>here</span></a>!</Typography></FadeInSection>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box id="experience" sx={{ mb: { xs: 10, md: 12 } }}>
          <ExperienceSection />
        </Box>
      </FadeInSection>
      <Box component="footer" sx={{ width: '100%', py: 3, textAlign: 'center', backgroundColor: '#0a192f', color: '#8892b0', fontSize: '1rem', mt: 4 }}>
        © Copyright 2025, Jason Cheung
      </Box>
    </>
  );
}

export default HomePage; 