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
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MuiAvatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar({ blogPosts, experiences, interests, scrollToSection, mode, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [scrolled, setScrolled] = React.useState(false);

  // Track scroll position for dynamic navbar background
  React.useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/' || location.pathname === '') {
        // Homepage: Change background when scrolled past ~40% of viewport
        const scrollThreshold = window.innerHeight * 0.4;
        setScrolled(window.scrollY > scrollThreshold);
      } else if (location.pathname === '/blog') {
        // Blog page: Change background when scrolled past ~12% of viewport (where Articles header gradient is)
        const scrollThreshold = window.innerHeight * 0.12;
        setScrolled(window.scrollY > scrollThreshold);
      } else if (location.pathname.startsWith('/blog/')) {
        // Blog post pages: always use grey background
        setScrolled(true);
      } else {
        // Other pages: keep white background
        setScrolled(false);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

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
    
    // Search interests
    const interestMatches = [];
    if (interests && interests.children) {
      interests.children.forEach(category => {
        // Check category name
        if (category.name.toLowerCase().includes(q)) {
          interestMatches.push({
            type: 'interest',
            title: category.name,
            category: category.name,
            isCategory: true
          });
        }
        // Check subcategories
        if (category.children) {
          category.children.forEach(subcat => {
            if (subcat.name.toLowerCase().includes(q)) {
              interestMatches.push({
                type: 'interest',
                title: subcat.name,
                category: category.name,
                isCategory: false
              });
            }
          });
        }
      });
    }
    
    setSearchResults([...blogMatches, ...expMatches, ...interestMatches]);
  }, [searchQuery, blogPosts, experiences, interests]);

  const handleResultClick = (result) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (result.type === 'blog') {
      navigate(result.link);
    } else if (result.type === 'experience') {
      handleNav('experience');
    } else if (result.type === 'interest') {
      handleNav('interests');
    }
  };

  // Handle escape key to close search
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [searchOpen]);

  return (
    <AppBar 
      position="sticky" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        background: mode === 'light' 
          ? (scrolled ? '#F1F1F1' : '#ffffff')
          : '#000000',
        transition: 'background 0.3s ease'
      }}
    >
      <Toolbar sx={{ minHeight: { xs: '56px', md: '60px' }, py: 1, px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
              href="https://cheung-jason.github.io/Jason/"
              underline="none"
              sx={{ 
                color: mode === 'light' ? '#666666' : '#ffffff', 
                fontWeight: 700, 
                fontSize: '1rem',
                '&:hover': { opacity: 0.7 }
              }}
              onClick={e => { 
                e.preventDefault(); 
                window.location.href = 'https://cheung-jason.github.io/Jason/';
              }}
            >
              Jason Cheung
            </Link>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <Button
                href="https://cheung-jason.github.io/Jason/"
                sx={{ color: mode === 'light' ? '#666666' : '#ffffff', textTransform: 'none', fontWeight: 500, fontSize: '0.875rem', py: 0.5 }}
                onClick={e => { 
                  e.preventDefault(); 
                  window.location.href = 'https://cheung-jason.github.io/Jason/';
                }}
              >Home</Button>
              <Button
                sx={{ color: mode === 'light' ? '#666666' : '#ffffff', textTransform: 'none', fontWeight: 500, fontSize: '0.875rem', py: 0.5 }}
                onClick={() => navigate('/blog')}
              >Blog</Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title="Search">
              <IconButton size="small" sx={{ color: mode === 'light' ? '#666666' : '#ffffff' }} onClick={() => setSearchOpen(true)}>
                <SearchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Light Mode">
              <IconButton 
                size="small" 
                sx={{ 
                  color: mode === 'light' ? '#666666' : '#ffffff',
                  opacity: mode === 'light' ? 1 : 0.3
                }} 
                onClick={() => mode === 'dark' && toggleTheme()}
              >
                <WbSunnyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Dark Mode">
              <IconButton 
                size="small" 
                sx={{ 
                  color: mode === 'light' ? '#666666' : '#ffffff',
                  opacity: mode === 'dark' ? 1 : 0.3
                }} 
                onClick={() => mode === 'light' && toggleTheme()}
              >
                <DarkModeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub">
              <IconButton
                size="small"
                component="a"
                href="https://github.com/cheung-jason"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: mode === 'light' ? '#666666' : '#ffffff' }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Email">
              <IconButton
                size="small"
                component="a"
                href="mailto:cheung.jason06@gmail.com"
                sx={{ color: mode === 'light' ? '#666666' : '#ffffff' }}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton
                size="small"
                component="a"
                href="https://www.linkedin.com/in/jason-cheung-3vb/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: mode === 'light' ? '#666666' : '#ffffff' }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
      {/* Backdrop */}
      {searchOpen && (
        <Box
          onClick={() => setSearchOpen(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1200
          }}
        />
      )}
      
      {/* Dropdown Search Panel */}
      {searchOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: { xs: '56px', md: '60px' },
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: '95%', sm: '600px' },
            maxHeight: '70vh',
            backgroundColor: mode === 'light' ? '#ffffff' : '#1a1a1a',
            borderRadius: '8px',
            boxShadow: mode === 'light' ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 8px 32px rgba(255, 255, 255, 0.1)',
            zIndex: 1300,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ p: 2, borderBottom: mode === 'light' ? '1px solid #e0e0e0' : '1px solid #333' }}>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              value={searchQuery}
              placeholder="Search blog, experience, or interests..."
              onChange={e => setSearchQuery(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                  backgroundColor: mode === 'light' ? '#f5f5f5' : '#2a2a2a',
                  borderRadius: '8px',
                  color: mode === 'light' ? '#000000' : '#ffffff'
                },
                '& .MuiInputBase-input::placeholder': {
                  color: mode === 'light' ? '#999999' : '#666666',
                  opacity: 1
                }
              }}
              InputProps={{
                style: { color: mode === 'light' ? '#000000' : '#ffffff' }
              }}
            />
          </Box>
          <Box sx={{ overflowY: 'auto', maxHeight: 'calc(70vh - 80px)' }}>
            <List sx={{ py: 0 }}>
              {searchResults.length === 0 && searchQuery && (
                <ListItem>
                  <ListItemText 
                    primary="No results found." 
                    sx={{ color: mode === 'light' ? '#666666' : '#ffffff', textAlign: 'center', py: 4 }} 
                  />
                </ListItem>
              )}
              {searchResults.length === 0 && !searchQuery && (
                <ListItem>
                  <ListItemText 
                    primary="Start typing to search..." 
                    sx={{ color: mode === 'light' ? '#999999' : '#666666', textAlign: 'center', py: 4 }} 
                  />
                </ListItem>
              )}
              {searchResults.map((result, idx) => (
                <ListItem 
                  button 
                  key={idx} 
                  onClick={() => handleResultClick(result)} 
                  alignItems="flex-start"
                  sx={{
                    '&:hover': {
                      backgroundColor: mode === 'light' ? '#f5f5f5' : '#2a2a2a'
                    },
                    borderBottom: idx < searchResults.length - 1 
                      ? (mode === 'light' ? '1px solid #f0f0f0' : '1px solid #333')
                      : 'none'
                  }}
                >
                  {result.type === 'blog' && (
                    <ListItemAvatar>
                      <MuiAvatar src={result.image} alt={result.title} variant="rounded" />
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={result.title}
                    secondary={
                      result.type === 'blog' 
                        ? new Date(result.date).toLocaleDateString() 
                        : result.type === 'interest'
                        ? `Interest: ${result.category}${!result.isCategory ? ' category' : ''}`
                        : result.company
                    }
                    sx={{ 
                      '& .MuiListItemText-primary': { color: mode === 'light' ? '#666666' : '#ffffff', fontWeight: 500 },
                      '& .MuiListItemText-secondary': { color: mode === 'light' ? '#666666' : '#b0b0b0' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </AppBar>
  );
}

export default NavBar; 