import { Container, Box, Typography, Paper } from '@mui/material';
import ImageUploader from '@/components/upload/ImageUploader';
import BiotechIcon from '@mui/icons-material/Biotech';

export default function DiagnosticoPage() {
  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              display: 'inline-flex', alignItems: 'center', px: 3, py: 1, 
              borderRadius: 50, bgcolor: '#e8f5e9', color: '#2e7d32', mb: 2
            }}
          >
            <BiotechIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="subtitle2" fontWeight="bold">MÓDULO DE ANÁLISIS</Typography>
          </Paper>
          <Typography variant="h4" fontWeight="900" color="#1a1a1a">Centro de Diagnóstico</Typography>
        </Box>

        {/* Componente Principal */}
        <ImageUploader />

      </Container>
    </Box>
  );
}