import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import experiences from './data/experiences';
import blogPosts from './data/blogPosts';
import { HashRouter as Router } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90a4ae',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#e6f1ff',
      secondary: '#8892b0',
    },
  },
  typography: {
    fontFamily: 'Aptos, Arial, sans-serif',
  },
});

// Add shake animation style
const shakeKeyframes = `@keyframes shake { 0% { transform: translate(0, 0) rotate(0deg); } 10% { transform: translate(-2px, 2px) rotate(-2deg); } 20% { transform: translate(-4px, 0) rotate(2deg); } 30% { transform: translate(4px, 2px) rotate(0deg); } 40% { transform: translate(2px, -2px) rotate(2deg); } 50% { transform: translate(-2px, 2px) rotate(-2deg); } 60% { transform: translate(-4px, 0) rotate(2deg); } 70% { transform: translate(4px, 0) rotate(0deg); } 80% { transform: translate(2px, -2px) rotate(2deg); } 90% { transform: translate(-2px, 2px) rotate(-2deg); } 100% { transform: translate(0, 0) rotate(0deg); } }`;
if (typeof document !== 'undefined' && !document.getElementById('shake-keyframes')) {
  const style = document.createElement('style');
  style.id = 'shake-keyframes';
  style.innerHTML = shakeKeyframes;
  document.head.appendChild(style);
}

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar blogPosts={blogPosts} experiences={experiences} scrollToSection={scrollToSection} />
        <Routes>
          <Route path="/" element={<HomePage experiences={experiences} scrollToSection={scrollToSection} />} />
          <Route path="/blog" element={<BlogPage blogPosts={blogPosts} />} />
          <Route path="/blog/:slug" element={<BlogPostPage blogPosts={blogPosts} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
