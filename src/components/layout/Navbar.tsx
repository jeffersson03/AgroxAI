"use client";

import { useState } from "react";
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
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import Image from "next/image";
import Link from "next/link";
import logo from "@/components/ui/shapes/logo.png";
const NAV_ITEMS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cultivos", href: "#cultivos" },
  { label: "Diagnóstico", href: "#diagnostico" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Menú para Móvil (Drawer)
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, color: "primary.main", fontWeight: "bold" }}
      >
        AgroxAI
      </Typography>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component="a"
              href={item.href}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "black", color: "text.primary", boxShadow: 1 }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* LOGO MÓVIL (Centro) */}
            <Link href="/">
              <Image
                src={logo}
                alt="AgroxAI Logo Letras"
                width={100}
                height={60}
                placeholder="blur"
                style={{ objectFit: "contain", cursor: 'pointer' }}
              />
            </Link>

            {/* MENÚ HAMBURGUESA (Móvil) */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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

            {/* ENLACES ESCRITORIO (Derecha) */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  component="a" // Importante: Funciona como enlace
                  href={item.href}
                  sx={{
                    my: 2,
                    color: "text.primary",
                    fontWeight: "bold",
                    transition: 'color 0.3s ease, text-shadow 0.3s ease',
                    "&:hover": {
                      color: "#8bdd2e",
                      bgcolor: "transparent",
                      textShadow: '0 0 5px #8bdd2e, 0 0 10px #8bdd2e',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
                color="success"
                href="#diagnostico"
                sx={{
                  my: 1.5,
                  ml: 2,
                  borderRadius: 50,
                  px: 3,
                  fontWeight: "bold",
                }}
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
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
