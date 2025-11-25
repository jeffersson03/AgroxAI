// src/app/page.tsx
'use client';

import LandingCarousel from '@/components/home/LandingCarousel';
import Image from 'next/image';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from '@mui/material';

// Iconos
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Datos para la portada
const CULTIVOS_LANDING = [
  { name: 'Uva', img: '/img/cultivo/uva.png', desc: 'Detección de Oidium, Mildiu y plagas en vid.' },
  { name: 'Palta', img: '/img/cultivo/palta.webp', desc: 'Análisis de hojas y frutos para Hass y Fuerte.' },
  { name: 'Mandarina', img: '/img/cultivo/mandarina.png', desc: 'Identificación de daños en cítricos.' },
  { name: 'Naranja', img: '/img/cultivo/naranja.png', desc: 'Diagnóstico de enfermedades comunes.' },
];

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#211d1dff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. HERO SECTION (Portada) */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '80vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Fondo elegante
          color: 'white',
          textAlign: 'center',
          px: 2,
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="overline" 
            sx={{ letterSpacing: 5, color: '#a5d6a7', fontWeight: 'bold', mb: 2, display: 'block' }}
          >
            TECNOLOGÍA AGRÍCOLA DE PRECISIÓN
          </Typography>

          <Typography 
            variant="h1" 
            sx={{ 
              mb: 2, 
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 300,
              lineHeight: 1.1
            }}
          >
            Protege tu cosecha con  <span style={{ color: '#ffffffff', fontFamily:'math' }}>AGROX</span> <span style={{ color: '#4caf50' }}>IA</span>
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ mb: 6, opacity: 0.8, fontWeight: 300, maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
          >
            La plataforma líder en Ica para la detección temprana de plagas.
            Diagnósticos instantáneos, tratamientos efectivos y asistencia experta 24/7.
          </Typography>

          <Button 
            variant="contained" 
            color="success" 
            size="large" 
            href="/diagnostico" // <--- AQUÍ ESTÁ EL CAMBIO IMPORTANTE
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              px: 6, py: 2, 
              fontSize: '1.2rem', 
              borderRadius: 50,
              bgcolor: '#4caf50', 
              color: 'white', 
              fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(76, 175, 80, 0.4)',
              '&:hover': { bgcolor: '#43a047', transform: 'translateY(-2px)' },
              transition: 'all 0.3s'
            }}
          >
            Iniciar Diagnóstico
          </Button>
        </Container>
      </Box>

      {/* 2. CULTIVOS SOPORTADOS */}
      <Container sx={{ py: 10 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="h4" fontWeight="800" color="white">
            Cultivos Soportados
          </Typography>
          <Typography variant="body1" color="grey.400" sx={{ mt: 1 }}>
            Algoritmos entrenados específicamente para la región.
          </Typography>
        </Box>
        <LandingCarousel cultivos={CULTIVOS_LANDING} />
      </Container>

      {/* 3. BENEFICIOS */}
      <Box sx={{ bgcolor: '#252323ff', py: 10 }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: <SpeedIcon fontSize="large" sx={{ color: '#2e7d32' }} />, title: 'Velocidad', desc: 'Resultados en < 5 segundos.' },
              { icon: <SecurityIcon fontSize="large" sx={{ color: '#d32f2f' }} />, title: 'Precisión', desc: 'Tratamientos validados.' },
              { icon: <EmojiNatureIcon fontSize="large" sx={{ color: '#fbc02d' }} />, title: 'Asistencia', desc: 'Chatbot experto incluido.' }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    borderRadius: 4, 
                    bgcolor: 'black',
                    border: '1px solid #d8d2d2ff'
                  }}
                >
                  <Box sx={{ mb: 2, bgcolor: '#f1f8e9', display: 'inline-flex', p: 2, borderRadius: '50%' }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, bgcolor: '#111', color: 'white', textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold" color="success.main" gutterBottom>AgroxAI</Typography>
        <Typography variant="body2" color="grey.600">© 2024 Proyecto de Innovación Tecnológica. Ica, Perú.</Typography>
      </Box>
    </Box>
  );
}