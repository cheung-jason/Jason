import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useLocation, useNavigate } from 'react-router-dom';

function Breadcrumb({ blogPostTitle, mode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('home');
      if (el) {
        const nav = document.querySelector('header.MuiAppBar-root');
        let navHeight = nav ? nav.offsetHeight : 0;
        if (!navHeight) navHeight = 72;
        const extraOffset = 8;
        const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - extraOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleBlogClick = (e) => {
    e.preventDefault();
    navigate('/blog');
  };

  const getBreadcrumbs = () => {
    const crumbs = [];
    
    crumbs.push({ label: 'Home', path: '/', onClick: handleHomeClick });
    
    if (location.pathname === '/blog') {
      crumbs.push({ label: 'Blog', path: '/blog', onClick: handleBlogClick, active: true });
    } else if (location.pathname.startsWith('/blog/')) {
      crumbs.push({ label: 'Blog', path: '/blog', onClick: handleBlogClick });
      if (blogPostTitle) {
        crumbs.push({ label: blogPostTitle, path: location.pathname, active: true });
      }
    }
    
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  const getBackgroundColor = () => {
    if (mode === 'dark') return '#000000';
    if (location.pathname === '/blog') return '#ffffff';
    if (location.pathname.startsWith('/blog/')) return '#F1F1F1';
    return '#ffffff';
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        pt: 2,
        pb: 1,
        backgroundColor: getBackgroundColor(),
      }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Typography sx={{ color: mode === 'light' ? '#999999' : '#666666', mx: 0.5 }}>/</Typography>
              )}
              {crumb.active ? (
                <Typography
                  sx={{
                    color: mode === 'light' ? '#333333' : '#ffffff',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                  }}
                >
                  {crumb.label}
                </Typography>
              ) : (
                <Link
                  href={crumb.path}
                  onClick={crumb.onClick}
                  sx={{
                    color: mode === 'light' ? '#666666' : '#b0b0b0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: mode === 'light' ? '#333333' : '#ffffff',
                    },
                  }}
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
  );
}

export default Breadcrumb;