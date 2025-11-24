"use client";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4E632', // --accent-primary
      light: '#E8F57D', // --accent-glow
      dark: '#8FA31C',  // --accent-dark
    },
    background: {
      default: '#121212', // --bg-deep
      paper: '#1E1E1E',   // --bg-surface
    },
    text: {
      primary: '#F0F0F0',   // --text-main
      secondary: '#9CA3AF', // --text-muted
    },
    divider: '#333333', // --border-subtle
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

export default theme;
