'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Logo from '../ui/Logo';

function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          {/* Aquí se pueden añadir otros elementos de navegación */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
