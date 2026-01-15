import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import blogPosts from '../data/blogPosts';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PaperclipIcon from '@mui/icons-material/AttachFile';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';

function BlogPostPage({ blogPosts: blogPostsProp, mode }) {
  const { slug } = useParams();
  // Use prop if provided, otherwise fall back to import
  const posts = blogPostsProp || blogPosts;
  const post = posts.find(p => p.slug === slug);
  const [openImg, setOpenImg] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  // Sort posts by date (newest to oldest)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const idx = sortedPosts.findIndex(p => p.slug === slug);
  const prevPost = idx > 0 ? sortedPosts[idx - 1] : null;
  const nextPost = idx < sortedPosts.length - 1 ? sortedPosts[idx + 1] : null;
  if (!post) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: mode === 'light' ? '#666666' : '#ffffff' }}>Blog post not found.</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000', color: mode === 'light' ? '#666666' : '#b0b0b0' }}>
      <Box sx={{ px: { xs: 2, md: 8 }, py: 8, maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Breadcrumb blogPostTitle={post.title} mode={mode} />
        </Box>
        <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: 3, mb: 4 }}>
          <Box
            component="img"
            src={post.image}
            alt={post.title}
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block'
            }}
          />
        </Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 1 }}>{post.category}</Typography>
        <Typography variant="h3" sx={{ color: mode === 'light' ? '#000000' : '#ffffff', mb: 1 }}>{post.title}</Typography>
        <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 1 }}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Tooltip title="Share on Facebook">
            <IconButton
              component="a"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={process.env.PUBLIC_URL + "/images/blog/facebook-icon.svg"} alt="Facebook" style={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on X">
            <IconButton
              component="a"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={process.env.PUBLIC_URL + "/images/blog/x-icon.svg"} alt="X" style={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share via Gmail">
            <IconButton
              component="a"
              href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.href)}`}
            >
              <img src={process.env.PUBLIC_URL + "/images/blog/gmail-icon.svg"} alt="Gmail" style={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy Link">
            <IconButton onClick={() => setOpenDialog(true)}>
              <PaperclipIcon style={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogContent sx={{ background: mode === 'light' ? '#ffffff' : '#1a1a1a', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: mode === 'light' ? '#000000' : '#ffffff', mb: 2 }}>Shareable Link</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
              <input
                type="text"
                value={window.location.href}
                readOnly
                style={{ width: '80%', padding: 8, borderRadius: 4, border: mode === 'light' ? '1px solid #cccccc' : '1px solid #333333', background: mode === 'light' ? '#ffffff' : '#0a0a0a', color: mode === 'light' ? '#666666' : '#b0b0b0', fontSize: 16 }}
              />
              <Tooltip title="Copy Link">
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  sx={{ color: mode === 'light' ? '#666666' : '#ffffff' }}
                >
                  <PaperclipIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title="Share on Facebook">
                <IconButton
                  component="a"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={process.env.PUBLIC_URL + "/images/blog/facebook-icon.svg"} alt="Facebook" style={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share on X">
                <IconButton
                  component="a"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={process.env.PUBLIC_URL + "/images/blog/x-icon.svg"} alt="X" style={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share via Gmail">
                <IconButton
                  component="a"
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.href)}`}
                >
                  <img src={process.env.PUBLIC_URL + "/images/blog/gmail-icon.svg"} alt="Gmail" style={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
      {post.content.map((para, idx) => {
        if (Array.isArray(para)) {
          return (
            <ul key={idx} style={{ marginLeft: 24, marginBottom: 16 }}>
              {para.map((step, i) => (
                <li key={i} style={{ color: mode === 'light' ? '#666666' : '#ffffff', fontSize: '1.1rem', fontWeight: 400 }}>{step}</li>
              ))}
            </ul>
          );
        } else if (typeof para === 'object' && para.type === 'image') {
          const isLargeImage = post.largeImages;
          return (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <Box
                component="img"
                src={para.src}
                alt={para.alt}
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: isLargeImage ? 600 : 350, 
                  borderRadius: 2, 
                  boxShadow: 2,
                  width: isLargeImage ? '100%' : 'auto'
                }}
              />
            </Box>
          );
        } else if (typeof para === 'object' && para.type === 'link') {
          return (
            <Typography key={idx} variant="body1" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 2, fontSize: '1.15rem' }}>
              <Link href={para.href} target="_blank" rel="noopener noreferrer" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', fontWeight: 600 }}>
                {para.text}
              </Link>
            </Typography>
          );
        } else {
          // Handle strings with newlines - split them into separate paragraphs
          if (typeof para === 'string' && para.includes('\n')) {
            return (
              <Box key={idx} sx={{ mb: 2 }}>
                {para.split('\n').filter(line => line.trim()).map((line, lineIdx) => (
                  <Typography key={lineIdx} variant="body1" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 1, fontSize: '1.15rem' }}>
                    {line.trim()}
                  </Typography>
                ))}
              </Box>
            );
          }
          return (
            <Typography key={idx} variant="body1" sx={{ color: mode === 'light' ? '#666666' : '#ffffff', mb: 2, fontSize: '1.15rem' }}>
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
                src={`${process.env.PUBLIC_URL}/images/blog/${img}.jpg`}
                alt={`Me Pouring ${idx + 1}`}
                sx={{ width: { xs: '100%', sm: 200, md: 220 }, height: 180, objectFit: 'cover', borderRadius: 2, boxShadow: 2, cursor: 'pointer' }}
                onClick={() => setOpenImg(`${process.env.PUBLIC_URL}/images/blog/${img}.jpg`)}
              />
            ))}
          </Box>
          <Dialog open={!!openImg} onClose={() => setOpenImg(null)} maxWidth="md">
            <DialogContent sx={{ p: 0, background: mode === 'light' ? '#ffffff' : '#1a1a1a' }}>
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
          <Link href={`#/blog/${prevPost.slug}`} sx={{ color: mode === 'light' ? '#666666' : '#b0b0b0', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
            {'← '}{prevPost.title}
          </Link>
        ) : <span />}
        {nextPost ? (
          <Link href={`#/blog/${nextPost.slug}`} sx={{ color: mode === 'light' ? '#666666' : '#b0b0b0', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
            {nextPost.title}{' →'}
          </Link>
        ) : <span />}
      </Box>
      </Box>
      <Footer mode={mode} />
    </Box>
  );
}

export default BlogPostPage; 