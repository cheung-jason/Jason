import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import experiences from './data/experiences';
import blogPosts from './data/blogPosts';
import { interests } from './data/interests';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const getTheme = (mode) => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: '#90a4ae',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#000000',
      paper: mode === 'light' ? '#ffffff' : '#000000',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff',
      secondary: mode === 'light' ? '#666666' : '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { color: mode === 'light' ? '#000000' : '#ffffff' },
    h2: { color: mode === 'light' ? '#000000' : '#ffffff' },
    h3: { color: mode === 'light' ? '#000000' : '#ffffff' },
    h4: { color: mode === 'light' ? '#000000' : '#ffffff' },
    h5: { color: mode === 'light' ? '#000000' : '#ffffff' },
    h6: { color: mode === 'light' ? '#000000' : '#ffffff' },
    body1: { color: mode === 'light' ? '#666666' : '#ffffff' },
    body2: { color: mode === 'light' ? '#666666' : '#ffffff' },
  },
});

function scrollToSection(id) {
  setTimeout(() => {
  const el = document.getElementById(id);
  if (el) {
      const nav = document.querySelector('header.MuiAppBar-root');
      let navHeight = nav ? nav.offsetHeight : 0;
      if (!navHeight) navHeight = 72;
      const extraOffset = 8;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - extraOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, 50);
}

function App() {
  const [mode, setMode] = React.useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar 
          blogPosts={blogPosts} 
          experiences={experiences} 
          interests={interests} 
          scrollToSection={scrollToSection}
          mode={mode}
          toggleTheme={toggleTheme}
        />
        <Routes>
          <Route path="/" element={<HomePage experiences={experiences} scrollToSection={scrollToSection} mode={mode} />} />
          <Route path="/blog" element={<BlogPage blogPosts={blogPosts} mode={mode} />} />
          <Route path="/blog/:slug" element={<BlogPostPage blogPosts={blogPosts} mode={mode} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
