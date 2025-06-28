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
import Popover from '@mui/material/Popover';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import PaperclipIcon from '@mui/icons-material/AttachFile';

function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const [openImg, setOpenImg] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  // Sort posts by date (newest to oldest)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const idx = sortedPosts.findIndex(p => p.slug === slug);
  const prevPost = idx > 0 ? sortedPosts[idx - 1] : null;
  const nextPost = idx < sortedPosts.length - 1 ? sortedPosts[idx + 1] : null;
  if (!post) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" color="#90a4ae">Blog post not found.</Typography>
      </Box>
    );
  }
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
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="subtitle2" sx={{ color: '#90a4ae', mb: 1 }}>{post.category}</Typography>
        <Typography variant="h3" sx={{ color: '#ccd6f6', mb: 1 }}>{post.title}</Typography>
        <Typography variant="subtitle2" sx={{ color: '#a8b2d1', mb: 1 }}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
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
          <DialogContent sx={{ background: '#0a192f', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#ccd6f6', mb: 2 }}>Shareable Link</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
              <input
                type="text"
                value={window.location.href}
                readOnly
                style={{ width: '80%', padding: 8, borderRadius: 4, border: '1px solid #90a4ae', background: '#112240', color: '#e6f1ff', fontSize: 16 }}
              />
              <Tooltip title="Copy Link">
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  sx={{ color: '#90a4ae' }}
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
                src={`${process.env.PUBLIC_URL}/images/blog/${img}.jpg`}
                alt={`Me Pouring ${idx + 1}`}
                sx={{ width: { xs: '100%', sm: 200, md: 220 }, height: 180, objectFit: 'cover', borderRadius: 2, boxShadow: 2, cursor: 'pointer' }}
                onClick={() => setOpenImg(`${process.env.PUBLIC_URL}/images/blog/${img}.jpg`)}
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
          <Link href={`#/blog/${prevPost.slug}`} sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
            {'< '}{prevPost.title}
          </Link>
        ) : <span />}
        {nextPost ? (
          <Link href={`#/blog/${nextPost.slug}`} sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
            {nextPost.title}{' >'}
          </Link>
        ) : <span />}
      </Box>
    </Box>
  );
}

function ShareButton({ url, title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton onClick={handleClick} sx={{ ml: 1 }}>
        <ContentCopyIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
          <Tooltip title="Share on Facebook">
            <IconButton
              component="a"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on X">
            <IconButton
              component="a"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share via Email">
            <IconButton
              component="a"
              href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy Link">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(url);
                handleClose();
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Popover>
    </>
  );
}

export default BlogPostPage; 