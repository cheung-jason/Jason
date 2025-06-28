import React from 'react';
import Box from '@mui/material/Box';
import { useInView } from 'react-intersection-observer';

function FadeInSection({ children, threshold = 0.15, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
}

export default FadeInSection;

export function FadeInList({ items, startDelay = 0, step = 150, children }) {
  return items.map((item, idx) => (
    <FadeInSection key={idx} delay={startDelay + idx * step}>
      {children(item, idx)}
    </FadeInSection>
  ));
} 