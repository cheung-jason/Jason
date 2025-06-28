import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FadeInSection, { FadeInList } from './FadeInSection';
import experiences from '../data/experiences';

function ExperienceSection() {
  const [selected, setSelected] = React.useState(0);
  return (
    <Box id="experience" sx={{ minHeight: '40vh', backgroundColor: '#0a192f', color: '#e6f1ff', display: 'flex', flexDirection: 'column', px: { xs: 2, md: 8 }, py: { xs: 6, md: 10 }, gap: 6 }}>
      <FadeInSection delay={0}>
      <FadeInSection delay={0}><Typography variant="h3" sx={{ mb: 3, color: '#90a4ae', fontWeight: 700 }}>/ experience</Typography></FadeInSection>
      </FadeInSection>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', justifyContent: 'center', gap: 6 }}>
        <List sx={{ minWidth: 200, maxWidth: 260, p: 0, background: 'none', borderRadius: 0, boxShadow: 'none' }}>
          {experiences.map((exp, idx) => (
            <FadeInSection key={exp.company} delay={idx * 100}>
              <ListItem disablePadding sx={{ cursor: 'pointer' }} onClick={() => setSelected(idx)}>
                <ListItemText
                  primary={
                    <span
                      style={{
                        color: selected === idx ? '#90a4ae' : '#a8b2d1',
                        fontWeight: selected === idx ? 700 : 500,
                        transition: 'color 0.2s, font-weight 0.2s'
                      }}
                    >
                      {exp.company.split('–')[0]}
                    </span>
                  }
                />
              </ListItem>
            </FadeInSection>
          ))}
        </List>
        <Box sx={{ flex: 1, ml: { md: 6 }, mt: { xs: 4, md: 0 }, p: 0, minWidth: 0 }}>
          <FadeInSection delay={100}>
            <Typography variant="h6" sx={{ color: '#e6f1ff', mb: 1 }}>
             {experiences[selected].title} @ <span style={{ color: '#90a4ae' }}>{experiences[selected].company.split('–')[0]}</span>
            </Typography>
          </FadeInSection>
          <FadeInSection delay={150}>
            <Typography variant="subtitle1" sx={{ color: '#a8b2d1', mb: 1 }}>
              {experiences[selected].date}
            </Typography>
          </FadeInSection>
          <FadeInSection delay={300}>
            <Divider sx={{ background: '#90a4ae', mb: 2, opacity: 0.3 }} />
          </FadeInSection>
          <FadeInList items={experiences[selected].details} startDelay={400} step={80}>
            {(item, i) => (
              <Typography component="li" sx={{ mb: 1, color: '#e6f1ff', fontSize: '1rem', pl: 2, listStyle: 'disc' }}>
                {item}
              </Typography>
            )}
          </FadeInList>
        </Box>
      </Box>
    </Box>
  );
}

export default ExperienceSection; 