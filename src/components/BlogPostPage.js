import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

function BlogPostPage({ blogPosts }) {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const [openImg, setOpenImg] = React.useState(null);
  const [showShare, setShowShare] = React.useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  // Sort posts by date (newest to oldest)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const idx = sortedPosts.findIndex(p => p.slug === slug);
  const prevPost = idx > 0 ? sortedPosts[idx - 1] : null;
  const nextPost = idx < sortedPosts.length - 1 ? sortedPosts[idx + 1] : null;
  React.useEffect(() => {
    if (!showShare) return;
    const handleClick = (e) => {
      if (!e.target.closest('.share-row') && !e.target.closest('.share-btn')) {
        setShowShare(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showShare]);
  if (!post) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" color="#90a4ae">Blog post not found.</Typography>
      </Box>
    );
  }
  const handleShareClick = () => {
    setShowShare(v => !v);
  };
  const handleShareOption = (option) => {
    const url = window.location.origin + post.link;
    const title = encodeURIComponent('Check out this blog post!');
    if (option === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,'_blank');
    } else if (option === 'x') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`,'_blank');
    } else if (option === 'gmail') {
      window.open(`https://mail.google.com/mail/?view=cm&to=&su=Check%20out%20this%20blog%20post!&body=${encodeURIComponent(url)}`,'_blank');
    } else if (option === 'copy') {
      setLinkDialogOpen(true);
      setShowShare(false);
      return;
    }
    setShowShare(false);
  };
  const handleCopyLink = () => {
    const url = window.location.origin + post.link;
    navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  };
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0a192f', color: '#e6f1ff', px: { xs: 2, md: 8 }, py: 8, maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ width: '100%', height: 400, overflow: 'hidden', borderRadius: 3, mb: 4 }}>
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{
            width: '100%',
            height: 500,
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: '#90a4ae', mb: 1 }}>{post.category}</Typography>
        <Typography variant="h3" sx={{ color: '#ccd6f6', mb: 1 }}>{post.title}</Typography>
        <Typography variant="subtitle2" sx={{ color: '#a8b2d1', mb: 2 }}>{(() => { const [year, month, day] = post.date.split('-'); return new Date(year, month - 1, day).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); })()}</Typography>
        <Button
          className="share-btn"
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleShareClick}
          sx={{ color: '#90a4ae', borderColor: '#233554', mt: 1, fontWeight: 600 }}
        >
          Share
        </Button>
        {showShare && (
          <Box className="share-row" sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Tooltip title="Share on Facebook"><span><IconButton onClick={() => handleShareOption('facebook')} sx={{ color: '#1877f3' }}><img src="/images/blog/facebook-icon.svg" alt="Facebook" style={{ width: 32, height: 32 }} /></IconButton></span></Tooltip>
            <Tooltip title="Share on X"><span><IconButton onClick={() => handleShareOption('x')} sx={{ color: '#000' }}><img src="/images/blog/x-icon.svg" alt="X" style={{ width: 32, height: 32 }} /></IconButton></span></Tooltip>
            <Tooltip title="Share on Gmail"><span><IconButton onClick={() => handleShareOption('gmail')} sx={{ color: '#EA4335' }}><img src="/images/blog/gmail-icon.svg" alt="Gmail" style={{ width: 32, height: 32 }} /></IconButton></span></Tooltip>
            <Tooltip title="Get sharable link"><span><IconButton onClick={() => handleShareOption('copy')} sx={{ color: '#90a4ae' }}><AttachFileIcon fontSize="large" /></IconButton></span></Tooltip>
          </Box>
        )}
        <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogContent sx={{ background: '#0a192f', color: '#e6f1ff', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Shareable Link</Typography>
            <TextField
              value={window.location.origin + post.link}
              fullWidth
              InputProps={{ readOnly: true, style: { color: '#e6f1ff' } }}
              sx={{ mb: 2, input: { color: '#e6f1ff' } }}
            />
            <Button variant="contained" color="primary" onClick={handleCopyLink} sx={{ fontWeight: 600, mb: 1 }}>Copy Link</Button>
          </DialogContent>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="Copied!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
      {post.content.map((para, idx) => {
        if (Array.isArray(para)) {
          return (
            <ul key={idx} style={{ marginLeft: 24, marginBottom: 16 }}>
              {para.map((step, i) => (
                <li key={i} style={{ color: '#a8b2d1', fontSize: '1.1rem', fontWeight: 700 }}>{step}</li>
              ))}
            </ul>
          );
        } else if (typeof para === 'object' && para.type === 'image') {
          return (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <Box
                component="img"
                src={para.src}
                alt={para.alt}
                sx={{ maxWidth: '100%', maxHeight: 350, borderRadius: 2, boxShadow: 2 }}
              />
            </Box>
          );
        } else if (typeof para === 'object' && para.type === 'link') {
          return (
            <Typography key={idx} variant="body1" sx={{ color: '#a8b2d1', mb: 2, fontSize: '1.15rem' }}>
              <Link href={para.href} target="_blank" rel="noopener noreferrer" sx={{ color: '#90a4ae', fontWeight: 600 }}>
                {para.text}
              </Link>
            </Typography>
          );
        } else {
          return (
            <Typography key={idx} variant="body1" sx={{ color: '#a8b2d1', mb: 2, fontSize: '1.15rem' }}>
              {para}
            </Typography>
          );
        }
      })}
      {post.slug === 'My First Pour Over Coffee Competition' && (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 6 }}>
            {['me-pouring-1', 'me-pouring-2', 'me-pouring-3'].map((img, idx) => (
              <Box
                key={img}
                component="img"
                src={`/images/blog/${img}.jpg`}
                alt={`Me Pouring ${idx + 1}`}
                sx={{ width: { xs: '100%', sm: 200, md: 220 }, height: 180, objectFit: 'cover', borderRadius: 2, boxShadow: 2, cursor: 'pointer' }}
                onClick={() => setOpenImg(`/images/blog/${img}.jpg`)}
              />
            ))}
          </Box>
          <Dialog open={!!openImg} onClose={() => setOpenImg(null)} maxWidth="md">
            <DialogContent sx={{ p: 0, background: '#0a192f' }}>
              <Box
                component="img"
                src={openImg}
                alt="Preview"
                sx={{ width: '100%', maxWidth: 700, display: 'block', mx: 'auto', borderRadius: 2 }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
      {/* Previous/Next navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 8 }}>
        {prevPost ? (
          <Link href={prevPost.link} sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
            {'< '}{prevPost.title}
          </Link>
        ) : <span />}
        {nextPost ? (
          <Link href={nextPost.link} sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
            {nextPost.title}{' >'}
          </Link>
        ) : <span />}
      </Box>
      <Box component="footer" sx={{ width: '100%', py: 3, textAlign: 'center', backgroundColor: '#0a192f', color: '#8892b0', fontSize: '1rem', mt: 4 }}>
        © Copyright 2025, Jason Cheung
      </Box>
    </Box>
  );
}

export default BlogPostPage; 