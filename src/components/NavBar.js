import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MuiAvatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar({ blogPosts, experiences, scrollToSection }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleNav = (section) => {
    if (location.pathname === '/') {
      scrollToSection(section);
    } else {
      navigate('/', { state: { scrollTo: section } });
    }
  };

  React.useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const blogMatches = blogPosts.filter(post =>
      post.title.toLowerCase().includes(q) ||
      (Array.isArray(post.content) && post.content.some(c => typeof c === 'string' && c.toLowerCase().includes(q)))
    ).map(post => ({
      type: 'blog',
      title: post.title,
      link: post.link,
      image: post.image,
      date: post.date
    }));
    const expMatches = experiences.filter(exp =>
      exp.company.toLowerCase().includes(q) ||
      exp.title.toLowerCase().includes(q) ||
      exp.details.some(d => d.toLowerCase().includes(q))
    ).map(exp => ({
      type: 'experience',
      title: exp.title + ' @ ' + exp.company.split('–')[0],
      company: exp.company,
      details: exp.details,
    }));
    setSearchResults([...blogMatches, ...expMatches]);
  }, [searchQuery, blogPosts, experiences]);

  const handleResultClick = (result) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (result.type === 'blog') {
      navigate(result.link);
    } else if (result.type === 'experience') {
      handleNav('experience');
    }
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #233554', background: '#0a192f' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link
            href="#home"
            underline="none"
            sx={{ color: '#90a4ae', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 1 }}
            onClick={e => { e.preventDefault(); handleNav('home'); }}
          >
          </Link>
          <Button
            href="#home"
            sx={{ color: '#a8b2d1', textTransform: 'none', fontWeight: 500, fontSize: '0.95rem' }}
            onClick={e => { e.preventDefault(); handleNav('home'); }}
          >Home</Button>
          <Button
            href="#about"
            sx={{ color: '#a8b2d1', textTransform: 'none', fontWeight: 500, fontSize: '0.95rem' }}
            onClick={e => { e.preventDefault(); handleNav('about'); }}
          >About</Button>
          <Button
            href="#experience"
            sx={{ color: '#a8b2d1', textTransform: 'none', fontWeight: 500, fontSize: '0.95rem' }}
            onClick={e => { e.preventDefault(); handleNav('experience'); }}
          >Experience</Button>
          <Button
            sx={{ color: '#a8b2d1', textTransform: 'none', fontWeight: 500, fontSize: '0.95rem' }}
            onClick={() => navigate('/blog')}
          >Blog</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Search">
            <IconButton sx={{ color: '#90a4ae' }} onClick={() => setSearchOpen(true)}>
              <SearchIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub">
            <IconButton
              component="a"
              href="https://github.com/spiritofchaoss"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#90a4ae' }}
            >
              <GitHubIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Email">
            <IconButton
              component="a"
              href="mailto:cheung.jason06@gmail.com"
              sx={{ color: '#90a4ae' }}
            >
              <EmailIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/jason-cheung-3vb/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#90a4ae' }}
            >
              <LinkedInIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: '#0a192f', color: '#ccd6f6' }}>Search</DialogTitle>
        <DialogContent sx={{ background: '#0a192f' }}>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            placeholder="Search blog or experience..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            sx={{ mb: 2, input: { color: '#e6f1ff' } }}
            InputProps={{ style: { color: '#e6f1ff' } }}
          />
          <List>
            {searchResults.length === 0 && searchQuery && (
              <ListItem><ListItemText primary="No results found." /></ListItem>
            )}
            {searchResults.map((result, idx) => (
              <ListItem button key={idx} onClick={() => handleResultClick(result)} alignItems="flex-start">
                {result.type === 'blog' && (
                  <ListItemAvatar>
                    <MuiAvatar src={result.image} alt={result.title} />
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={result.title}
                  secondary={result.type === 'blog' ? new Date(result.date).toLocaleDateString() : result.company}
                  sx={{ color: '#e6f1ff' }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}

export default NavBar; 