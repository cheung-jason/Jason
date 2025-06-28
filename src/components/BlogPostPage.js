import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import blogPosts from '../data/blogPosts';

function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const [openImg, setOpenImg] = React.useState(null);
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
      <Typography variant="subtitle2" sx={{ color: '#90a4ae', mb: 1 }}>{post.category}</Typography>
      <Typography variant="h3" sx={{ color: '#ccd6f6', mb: 1 }}>{post.title}</Typography>
      <Typography variant="subtitle2" sx={{ color: '#a8b2d1', mb: 3 }}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
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
    </Box>
  );
}

export default BlogPostPage; 