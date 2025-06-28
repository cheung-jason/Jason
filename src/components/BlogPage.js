import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function BlogPage({ blogPosts }) {
  const [showShareIdx, setShowShareIdx] = React.useState(null);
  const [shareUrl, setShareUrl] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('desc'); // 'desc' for newest to oldest, 'asc' for oldest to newest

  React.useEffect(() => {
    if (showShareIdx === null) return;
    const handleClick = (e) => {
      if (!e.target.closest('.share-row') && !e.target.closest('.share-btn')) {
        setShowShareIdx(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showShareIdx]);

  const handleShareClick = (idx, url) => {
    setShowShareIdx(idx === showShareIdx ? null : idx);
    setShareUrl(url);
  };
  const handleShareOption = (option, url) => {
    const fullUrl = window.location.origin + url;
    const title = encodeURIComponent('Check out this blog post!');
    if (option === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,'_blank');
    } else if (option === 'x') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${title}`,'_blank');
    } else if (option === 'gmail') {
      window.open(`https://mail.google.com/mail/?view=cm&to=&su=Check%20out%20this%20blog%20post!&body=${encodeURIComponent(fullUrl)}`,'_blank');
    } else if (option === 'copy') {
      navigator.clipboard.writeText(fullUrl);
    }
    setShowShareIdx(null);
  };

  const handleSortChange = (event, newOrder) => {
    if (newOrder) setSortOrder(newOrder);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0a192f', color: '#e6f1ff', px: { xs: 2, md: 8 }, py: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <ToggleButtonGroup
          value={sortOrder}
          exclusive
          onChange={handleSortChange}
          size="small"
          sx={{ background: '#112240', borderRadius: 2 }}
        >
          <ToggleButton value="desc" sx={{ color: '#ccd6f6', fontWeight: 600 }}>Newest to Oldest</ToggleButton>
          <ToggleButton value="asc" sx={{ color: '#ccd6f6', fontWeight: 600 }}>Oldest to Newest</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'left' }}>
        {[...blogPosts]
          .sort((a, b) => {
            if (sortOrder === 'desc') return new Date(b.date) - new Date(a.date);
            else return new Date(a.date) - new Date(b.date);
          })
          .map((post, idx) => (
            <Box key={post.id} sx={{ width: 320, background: '#0a192f', borderRadius: 3, boxShadow: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <Box component="img" src={post.image} alt={post.title} sx={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: '#90a4ae', mb: 1 }}>{post.category}</Typography>
                <Typography variant="h6" sx={{ color: '#ccd6f6', mb: 1 }}>{post.title}</Typography>
                <Typography variant="subtitle2" sx={{ color: '#a8b2d1', mb: 2 }}>{(() => { const [year, month, day] = post.date.split('-'); return new Date(year, month - 1, day).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); })()}</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Link href={`#/blog/${post.slug}`} sx={{ color: '#90a4ae', fontWeight: 600, alignSelf: 'center' }}>
                  Read more
                </Link>
              </Box>
            </Box>
          ))}
      </Box>
      <Box component="footer" sx={{ width: '100%', py: 3, textAlign: 'center', backgroundColor: '#0a192f', color: '#8892b0', fontSize: '1rem', mt: 4 }}>
        © Copyright 2025, Jason Cheung
      </Box>
    </Box>
  );
}

export default BlogPage; 