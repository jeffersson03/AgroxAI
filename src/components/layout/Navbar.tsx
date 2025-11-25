'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Box, 
  Container 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cultivos', href: '#cultivos' },
  { label: 'Diagnóstico', href: '#diagnostico' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Menú para Móvil (Drawer)
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
        AgroxAI
      </Typography>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.href} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            
            {/* LOGO (Izquierda) */}
            <AgricultureIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'success.main' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AgroxAI
            </Typography>

            {/* MENÚ HAMBURGUESA (Móvil) */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* LOGO MÓVIL (Centro) */}
            <AgricultureIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'success.main' }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AgroxAI
            </Typography>

            {/* ENLACES ESCRITORIO (Derecha) */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', gap: 2 }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  component="a" // Importante: Funciona como enlace
                  href={item.href}
                  sx={{ 
                    my: 2, 
                    color: 'text.primary', 
                    fontWeight: 'bold',
                    '&:hover': { color: 'success.main', bgcolor: 'transparent' } 
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button 
                variant="contained" 
                color="success" 
                href="#diagnostico"
                sx={{ my: 1.5, ml: 2, borderRadius: 50, px: 3, fontWeight: 'bold' }}
              >
                Probar Ahora
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer Component (Menú lateral móvil) */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Mejor rendimiento en móvil
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}