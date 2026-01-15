import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';

function BlogPage({ blogPosts, mode }) {
  const [sortOrder, setSortOrder] = React.useState('desc');

  const handleSortChange = (event, newOrder) => {
    if (newOrder) setSortOrder(newOrder);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: mode === 'light' ? 'linear-gradient(to bottom, #ffffff 0%, #ffffff 13%, #F1F1F1 13%, #F1F1F1 100%)' : '#000000', color: mode === 'light' ? '#666666' : '#b0b0b0' }}>
      <Box sx={{ flex: 1, px: { xs: 2, md: 8 }, py: 8, maxWidth: 1400, mx: 'auto', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Breadcrumb mode={mode} />
        </Box>
        <Typography variant="h2" sx={{ mb: 4, color: mode === 'light' ? '#000000' : '#ffffff', fontWeight: 700, textAlign: 'left' }}>
          Articles
        </Typography>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mr: 1 }}>Sort by:</Typography>
          <ToggleButtonGroup
            value={sortOrder}
            exclusive
            onChange={handleSortChange}
            size="small"
            sx={{ 
              border: 'none',
              '& .MuiToggleButtonGroup-grouped': {
                border: 'none',
                borderRadius: '20px !important',
                mx: 0.5,
                px: 2,
                py: 0.5,
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: mode === 'light' ? '#666666' : '#ffffff',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: mode === 'light' ? '#e8e8e8' : '#1a1a1a',
                },
                '&.Mui-selected': {
                  backgroundColor: mode === 'light' ? '#000000' : '#ffffff',
                  color: mode === 'light' ? '#ffffff' : '#000000',
                  '&:hover': {
                    backgroundColor: mode === 'light' ? '#333333' : '#e0e0e0',
                  }
                }
              }
            }}
          >
            <ToggleButton value="desc">Newest</ToggleButton>
            <ToggleButton value="asc">Oldest</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {blogPosts && [...blogPosts]
            .sort((a, b) => {
              if (sortOrder === 'desc') return new Date(b.date) - new Date(a.date);
              else return new Date(a.date) - new Date(b.date);
            })
            .map((post, idx) => (
              <Box key={post.id} sx={{ width: 320, background: mode === 'light' ? '#ffffff' : '#1a1a1a', borderRadius: 0, boxShadow: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box 
                  component="img" 
                  src={post.image} 
                  alt={post.title} 
                  sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 1 }}>{post.category}</Typography>
                  <Typography variant="h6" sx={{ color: mode === 'light' ? '#000000' : '#ffffff', mb: 1 }}>{post.title}</Typography>
                  <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 2 }}>{(() => { const [year, month, day] = post.date.split('-'); return new Date(year, month - 1, day).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); })()}</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Link 
                    href={`#/blog/${post.slug}`} 
                    sx={{ 
                      color: mode === 'light' ? '#666666' : '#ffffff', 
                      fontWeight: 600, 
                      alignSelf: 'center', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      textDecoration: 'none',
                      '&:hover .arrow': {
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    Read more
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
                  </Link>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Footer mode={mode} />
    </Box>
  );
}

export default BlogPage; 