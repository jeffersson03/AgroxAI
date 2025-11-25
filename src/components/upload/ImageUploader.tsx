'use client';

import { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress, 
  Card, 
  CardContent, 
  Stack, 
  Chip, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Grid, 
  Alert, 
  AlertTitle, 
  CardActionArea, 
  CardMedia, 
  Stepper, 
  Step, 
  StepLabel,
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl 
} from '@mui/material';

// Iconos
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpaIcon from '@mui/icons-material/Spa'; 
import ScienceIcon from '@mui/icons-material/Science'; 
import BiotechIcon from '@mui/icons-material/Biotech';
import WarningIcon from '@mui/icons-material/Warning';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BugReportIcon from '@mui/icons-material/BugReport';
import InfoIcon from '@mui/icons-material/Info';

// Datos y Chat
import { infoPlagas } from '@/data/infoPlagas';
import AgroxChat from '../chat/AgroxChat';

// Configuración de Cultivos
const CULTIVOS = [
  { id: 'uva', name: 'Uva', img: '/img/cultivo/uva.png' },
  { id: 'palta', name: 'Palta', img: '/img/cultivo/palta.webp' },
  { id: 'mandarina', name: 'Mandarina', img: '/img/cultivo/mandarina.png' },
  { id: 'naranja', name: 'Naranja', img: '/img/cultivo/naranja.png' },
];

const NIVELES_INFESTACION = [
  { val: 'Baja', label: 'Leve', sub: '< 20% Daño', desc: 'Pocos insectos, daño focalizado.', color: '#4caf50', icon: <SpaIcon fontSize="large" /> },
  { val: 'Media', label: 'Moderada', sub: '20% - 50%', desc: 'Presencia evidente, amarillamiento.', color: '#ff9800', icon: <InfoIcon fontSize="large" /> },
  { val: 'Alta', label: 'Severa', sub: '> 50% Daño', desc: 'Población masiva, defoliación.', color: '#f44336', icon: <WarningIcon fontSize="large" /> }
];

const PASOS = ['Muestra', 'Evaluación', 'Informe'];

export default function ImageUploader() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [infestationLevel, setInfestationLevel] = useState<string>('Media');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/diagnosticar', { method: 'POST', body: formData });
      const data = await res.json();
      
      if (data.success) {
        setResult(data.diagnostico);
        setInfestationLevel(data.diagnostico.severidad || 'Media'); 
        setActiveStep(1); 
      } else {
        alert('Error: ' + (data.error || 'Desconocido'));
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // --- FUNCIÓN NUEVA: Generar PDF ---
  const handleDownloadPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    try {
      // Importamos dinámicamente para evitar errores en el servidor
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Capturamos el contenido del reporte
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');

      // Configuramos el PDF (A4 vertical)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Agregamos la imagen al PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Informe_AgroxAI_${result?.plaga || 'Analisis'}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Hubo un problema al generar el PDF. Intenta de nuevo.');
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setFile(null);
    setPreview(null);
    setResult(null);
    setSelectedCrop(null);
  };

  // VISTA 1: SELECCIÓN
  const renderStep1 = () => (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, borderRadius: 4, bgcolor: 'white', border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: '800', color: '#1a1a1a', mb: 3 }}>
            <AgricultureIcon sx={{ mr: 1.5, color: 'success.main', fontSize: 28 }} /> 1. Selecciona tu Cultivo
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 5 }}>
        {CULTIVOS.map((cultivo) => (
            <Grid item xs={6} sm={3} key={cultivo.id}>
            <Card 
                elevation={selectedCrop === cultivo.id ? 4 : 0}
                sx={{ 
                    border: selectedCrop === cultivo.id ? '2px solid #2e7d32' : '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    transform: selectedCrop === cultivo.id ? 'translateY(-4px)' : 'none',
                    bgcolor: selectedCrop === cultivo.id ? '#f1f8e9' : 'white',
                    '&:hover': { borderColor: '#2e7d32', transform: 'translateY(-2px)' }
                }}
                onClick={() => setSelectedCrop(cultivo.id)}
            >
                <CardActionArea sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {selectedCrop === cultivo.id && (
                        <Box sx={{ position: 'absolute', top: 8, right: 8, color: 'success.main' }}>
                            <CheckCircleIcon />
                        </Box>
                    )}
                    <CardMedia component="img" image={cultivo.img} alt={cultivo.name} sx={{ width: 80, height: 80, objectFit: 'contain', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">{cultivo.name}</Typography>
                </CardActionArea>
            </Card>
            </Grid>
        ))}
        </Grid>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ opacity: selectedCrop ? 1 : 0.4, pointerEvents: selectedCrop ? 'auto' : 'none', transition: 'opacity 0.3s', filter: selectedCrop ? 'none' : 'grayscale(100%)' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: '800', color: '#1a1a1a', mb: 2 }}>
                <CloudUploadIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 28 }} /> 2. Sube la Evidencia
            </Typography>

            <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ 
                    height: 140, borderStyle: 'dashed', borderWidth: 2, borderColor: file ? 'success.main' : '#bdbdbd', mb: 3, 
                    bgcolor: file ? '#f1f8e9' : '#fafafa', borderRadius: 3, '&:hover': { borderColor: 'primary.main', bgcolor: '#f5f5f5' }
                }}
            >
                <Stack alignItems="center" spacing={1}>
                {file ? (
                    <>
                    <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                    <Typography variant="h6" color="success.main" fontWeight="bold">{file.name}</Typography>
                    <Typography variant="caption" color="text.secondary">Clic para cambiar imagen</Typography>
                    </>
                ) : (
                    <>
                    <CloudUploadIcon color="action" sx={{ fontSize: 40, opacity: 0.5 }} />
                    <Typography variant="body1" color="text.secondary" fontWeight="500">Arrastra tu foto aquí o haz clic</Typography>
                    </>
                )}
                </Stack>
                <input type="file" hidden accept="image/jpeg, image/png" onChange={handleFile} />
            </Button>

            {preview && <Box sx={{ mb: 3, p: 1, border: '1px solid #eee', borderRadius: 2, textAlign: 'center', bgcolor: '#fafafa' }}><img src={preview} alt="Preview" style={{ maxHeight: 250, maxWidth: '100%', objectFit: 'contain', borderRadius: 8 }} /></Box>}

            <Button variant="contained" fullWidth size="large" disabled={!file || loading} onClick={handleAnalyze} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <BiotechIcon />} sx={{ py: 2, borderRadius: 2, fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                {loading ? 'ANALIZANDO CON IA...' : 'EJECUTAR DIAGNÓSTICO'}
            </Button>
        </Box>
    </Paper>
  );

  // VISTA 2: EVALUACIÓN
  const renderStep2 = () => (
    <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={9}>
            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0' }}>
                <Box sx={{ bgcolor: '#e3f2fd', p: 4, borderBottom: '1px solid #bbdefb' }}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => setActiveStep(0)} sx={{ mb: 2 }}>Volver</Button>
                    <Typography variant="h5" fontWeight="800" color="#1565c0" sx={{ display: 'flex', alignItems: 'center' }}>
                        <AssessmentIcon sx={{ mr: 2, fontSize: 32 }} /> Evaluación Técnica
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>Confirma el nivel de gravedad para ajustar el tratamiento.</Typography>
                </Box>

                <CardContent sx={{ p: 4 }}>
                    <Paper elevation={0} sx={{ p: 3, bgcolor: '#fff3e0', borderRadius: 3, border: '1px solid #ffe0b2', mb: 5, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ p: 2, bgcolor: 'white', borderRadius: '50%', mr: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}><BugReportIcon color="warning" sx={{ fontSize: 32 }} /></Box>
                        <Box>
                            <Typography variant="overline" color="text.secondary" fontWeight="bold">RESULTADO IA</Typography>
                            <Typography variant="h4" fontWeight="800" color="#e65100" sx={{ textTransform: 'capitalize' }}>{result?.plaga}</Typography>
                            <Typography variant="body2">Confianza: <strong>{result?.confianza}%</strong></Typography>
                        </Box>
                    </Paper>

                    <Typography variant="h6" gutterBottom fontWeight="800" sx={{ mb: 3 }}>Selecciona Nivel de Infestación:</Typography>
                    
                    <Grid container spacing={2} sx={{ mb: 5 }}>
                        {NIVELES_INFESTACION.map((nivel) => (
                            <Grid item xs={12} md={4} key={nivel.val}>
                                <Card 
                                    elevation={0} onClick={() => setInfestationLevel(nivel.val)}
                                    sx={{ 
                                        cursor: 'pointer', border: infestationLevel === nivel.val ? `3px solid ${nivel.color}` : '1px solid #eee',
                                        bgcolor: infestationLevel === nivel.val ? `${nivel.color}0d` : 'white',
                                        transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }
                                    }}
                                >
                                    <CardActionArea sx={{ p: 3, height: '100%' }}>
                                        <Box sx={{ color: nivel.color, mb: 2 }}>{nivel.icon}</Box>
                                        <Typography variant="h6" fontWeight="bold" color={nivel.color}>{nivel.label}</Typography>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>{nivel.sub}</Typography>
                                        <Typography variant="body2" color="text.secondary">{nivel.desc}</Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Button variant="contained" color="primary" fullWidth size="large" onClick={() => setActiveStep(2)} endIcon={<ArrowForwardIcon />} sx={{ py: 2, fontWeight: 'bold', fontSize: '1.1rem', borderRadius: 2, boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)' }}>
                        GENERAR INFORME TÉCNICO
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  );

  // VISTA 3: INFORME
  const renderStep3 = () => (
    <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
            {/* ID="report-content" es CRÍTICO para el PDF */}
            <Card id="report-content" elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', overflow: 'hidden', bgcolor: 'white' }}>
                <Box sx={{ bgcolor: '#263238', color: 'white', p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Button startIcon={<ArrowBackIcon />} sx={{ color: 'grey.400', mb: 1 }} onClick={() => setActiveStep(1)}>Atrás</Button>
                        <Typography variant="h5" fontWeight="bold">Informe Técnico</Typography>
                    </Box>
                    {/* Botón PDF conectado a handleDownloadPDF */}
                    <Button 
                        variant="outlined" 
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }} 
                        startIcon={<PictureAsPdfIcon />}
                        onClick={handleDownloadPDF}
                    >
                        Descargar PDF
                    </Button>
                </Box>

                <CardContent sx={{ p: 4 }}>
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#f9fafb', mb: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold">CULTIVO</Typography>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>{selectedCrop}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold">PLAGA</Typography>
                                <Typography variant="subtitle1" fontWeight="bold" color="error">{result?.plaga}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold">GRAVEDAD</Typography>
                                <Chip label={infestationLevel} size="small" sx={{ bgcolor: infestationLevel === 'Alta' ? '#ffebee' : infestationLevel === 'Media' ? '#fff3e0' : '#e8f5e9', color: infestationLevel === 'Alta' ? '#c62828' : infestationLevel === 'Media' ? '#ef6c00' : '#2e7d32', fontWeight: '900' }} />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold">FECHA</Typography>
                                <Typography variant="subtitle1" fontWeight="bold">{new Date().toLocaleDateString()}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    {infoPlagas[result.plaga] && (
                        <Box>
                            <Typography variant="h6" gutterBottom fontWeight="800" sx={{ display: 'flex', alignItems: 'center', color: '#2e7d32', mb: 2 }}>
                                <LocalHospitalIcon sx={{ mr: 1 }} /> Plan de Manejo Sugerido
                            </Typography>
                            
                            <Alert severity={infestationLevel === 'Alta' ? 'error' : 'info'} sx={{ mb: 4, borderRadius: 2 }}>
                                <AlertTitle fontWeight="bold">Estrategia</AlertTitle>
                                {infestationLevel === 'Alta' ? 'La severidad es crítica. Se recomienda acción inmediata.' : 'Nivel manejable. Priorice control biológico.'}
                            </Alert>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 3, bgcolor: '#f1f8e9', border: '1px solid #c5e1a5' }}>
                                        <Typography variant="subtitle2" fontWeight="bold" color="success.dark" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}><SpaIcon fontSize="small" sx={{ mr: 1 }} /> BIOLÓGICO</Typography>
                                        <List dense disablePadding>{infoPlagas[result.plaga].tratamientoBio.map((t: string, i: number) => (<ListItem key={i} disableGutters sx={{ pb: 1 }}><ListItemIcon sx={{ minWidth: 28 }}><CheckCircleIcon fontSize="small" color="success" /></ListItemIcon><ListItemText primary={t} primaryTypographyProps={{ fontWeight: 500, color: 'success.dark' }} /></ListItem>))}</List>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 3, bgcolor: '#ffebee', border: '1px solid #ef9a9a' }}>
                                        <Typography variant="subtitle2" fontWeight="bold" color="error.dark" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}><ScienceIcon fontSize="small" sx={{ mr: 1 }} /> QUÍMICO</Typography>
                                        <List dense disablePadding>{infoPlagas[result.plaga].tratamientoQuim.map((t: string, i: number) => (<ListItem key={i} disableGutters sx={{ pb: 1 }}><ListItemIcon sx={{ minWidth: 28 }}><WarningIcon fontSize="small" color="error" /></ListItemIcon><ListItemText primary={t} primaryTypographyProps={{ fontWeight: 500, color: 'error.dark' }} /></ListItem>))}</List>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Button variant="text" color="inherit" onClick={handleReset} startIcon={<RestartAltIcon />} sx={{ color: 'text.secondary' }}>Iniciar Nuevo Análisis</Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>

        <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: 20 }}>
                <Paper elevation={4} sx={{ p: 0, bgcolor: '#121212', color: 'white', mb: 2, border: '1px solid #333', borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ p: 2, bgcolor: '#1f1f1f', borderBottom: '1px solid #333' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="secondary">🤖 Asistente Virtual</Typography>
                        <Typography variant="caption" sx={{ color: '#aaa' }}>¿Dudas sobre el tratamiento?</Typography>
                    </Box>
                    {/* Pasamos los datos al chat para que sepa qué responder */}
                    <AgroxChat plagaDetectada={result.plaga} />
                </Paper>
            </Box>
        </Grid>
    </Grid>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Box sx={{ width: '100%', mb: 5 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {PASOS.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
            </Stepper>
        </Box>
        {activeStep === 0 && renderStep1()}
        {activeStep === 1 && renderStep2()}
        {activeStep === 2 && renderStep3()}
    </Box>
  );
}