import { useState, useRef } from 'react';
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
  FormControl,
  Modal,
  IconButton
} from '@mui/material';

// Iconos
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
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
  
  // State and Refs for Camera functionality
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  };

  // --- CAMERA LOGIC ---
  const handleOpenCamera = async () => {
    setCameraOpen(true);
    try {
      // Prefer the rear camera on mobile devices
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("No se pudo acceder a la cámara. Asegúrate de dar los permisos necesarios en tu navegador.");
      setCameraOpen(false);
    }
  };

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCloseCamera = () => {
    stopCameraStream();
    setCameraOpen(false);
  };

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match the video feed
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const capturedFile = new File([blob], `captura-${Date.now()}.jpg`, { type: 'image/jpeg' });
          setFile(capturedFile);
          setPreview(URL.createObjectURL(capturedFile));
          setResult(null);
        }
      }, 'image/jpeg', 0.95); // 95% quality JPEG

      handleCloseCamera();
    }
  };
  // --- END CAMERA LOGIC ---


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

  const handleDownloadPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

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
    <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, borderRadius: 4, bgcolor: '#1e1e1e', border: '1px solid #333' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: '800', color: 'white', mb: 3 }}>
            <AgricultureIcon sx={{ mr: 1.5, color: '#8bdd2e', fontSize: 28 }} /> 1. Selecciona tu Cultivo
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 5 }}>
        {CULTIVOS.map((cultivo) => (
            <Grid item xs={6} sm={3} key={cultivo.id}>
            <Card 
                elevation={0}
                sx={{ 
                    border: selectedCrop === cultivo.id ? '2px solid #8bdd2e' : '1px solid #444',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    transform: selectedCrop === cultivo.id ? 'scale(1.05)' : 'none',
                    bgcolor: selectedCrop === cultivo.id ? '#2f3b2f' : '#2b2b2b',
                    boxShadow: selectedCrop === cultivo.id ? '0 0 15px #8bdd2e33' : 'none',
                    '&:hover': { borderColor: '#8bdd2e', transform: 'scale(1.05)' }
                }}
                onClick={() => setSelectedCrop(cultivo.id)}
            >
                <CardActionArea sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {selectedCrop === cultivo.id && (
                        <Box sx={{ position: 'absolute', top: 8, right: 8, color: '#8bdd2e' }}>
                            <CheckCircleIcon />
                        </Box>
                    )}
                    <CardMedia component="img" image={cultivo.img} alt={cultivo.name} sx={{ width: 80, height: 80, objectFit: 'contain', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold" color="white">{cultivo.name}</Typography>
                </CardActionArea>
            </Card>
            </Grid>
        ))}
        </Grid>

        <Divider sx={{ mb: 4, borderColor: '#444' }} />

        <Box sx={{ opacity: selectedCrop ? 1 : 0.4, pointerEvents: selectedCrop ? 'auto' : 'none', transition: 'opacity 0.3s' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: '800', color: 'white', mb: 0 }}>
                  <CloudUploadIcon sx={{ mr: 1.5, color: '#8bdd2e', fontSize: 28 }} /> 2. Sube la Evidencia
              </Typography>
              <IconButton onClick={handleOpenCamera} sx={{ color: '#8bdd2e', bgcolor: '#8bdd2e20', '&:hover': { bgcolor: '#8bdd2e40'} }}>
                <CameraAltIcon />
              </IconButton>
            </Box>

            <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ 
                    height: 140, borderStyle: 'dashed', borderWidth: 2, borderColor: file ? '#8bdd2e' : '#555', mb: 3, 
                    bgcolor: file ? '#2f3b2f' : '#2b2b2b', borderRadius: 3, 
                    '&:hover': { borderColor: '#8bdd2e', bgcolor: '#333' }
                }}
            >
                <Stack alignItems="center" spacing={1}>
                {file ? (
                    <>
                    <CheckCircleIcon color="success" sx={{ fontSize: 40, color: '#8bdd2e' }} />
                    <Typography variant="h6" sx={{ color: 'white' }} fontWeight="bold">{file.name}</Typography>
                    <Typography variant="caption" color="grey.400">Clic para cambiar imagen</Typography>
                    </>
                ) : (
                    <>
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'grey.600' }} />
                    <Typography variant="body1" color="grey.400" fontWeight="500">Arrastra tu foto aquí o haz clic</Typography>
                    </>
                )}
                </Stack>
                <input type="file" hidden accept="image/jpeg, image/png" onChange={handleFile} />
            </Button>

            {preview && <Box sx={{ mb: 3, p: 1, border: '1px solid #444', borderRadius: 2, textAlign: 'center', bgcolor: '#121212' }}><img src={preview} alt="Preview" style={{ maxHeight: 250, maxWidth: '100%', objectFit: 'contain', borderRadius: 8 }} /></Box>}

            <Button variant="contained" fullWidth size="large" disabled={!file || loading} onClick={handleAnalyze} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <BiotechIcon />} sx={{ py: 2, borderRadius: 2, fontWeight: 'bold', fontSize: '1.1rem', bgcolor: '#8bdd2e', color: '#121212', '&:hover': { bgcolor: '#79c026' }, '&:disabled': { bgcolor: '#333', color: '#666' } }}>
                {loading ? 'ANALIZANDO...' : 'EJECUTAR DIAGNÓSTICO'}
            </Button>
        </Box>
    </Paper>
  );

  // VISTA 2: EVALUACIÓN
  const renderStep2 = () => (
    <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={9}>
            <Card elevation={0} sx={{ borderRadius: 4, bgcolor: '#1e1e1e', border: '1px solid #333' }}>
                <Box sx={{ bgcolor: '#2b2b2b', p: 4, borderBottom: '1px solid #333' }}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => setActiveStep(0)} sx={{ mb: 2, color: 'grey.400', '&:hover': { bgcolor: '#444'} }}>Volver</Button>
                    <Typography variant="h5" fontWeight="800" color="white" sx={{ display: 'flex', alignItems: 'center' }}>
                        <AssessmentIcon sx={{ mr: 2, fontSize: 32, color: '#8bdd2e' }} /> Evaluación Técnica
                    </Typography>
                    <Typography variant="body1" color="grey.200" sx={{ mt: 1 }}>Confirma el nivel de gravedad para ajustar el tratamiento.</Typography>
                </Box>

                <CardContent sx={{ p: 4 }}>
                    <Paper elevation={0} sx={{ p: 3, bgcolor: '#2b2b2b', borderRadius: 3, border: '1px solid #555', mb: 5, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ p: 2, bgcolor: '#1e1e1e', borderRadius: '50%', mr: 3, border: '1px solid #444' }}><BugReportIcon color="warning" sx={{ fontSize: 32 }} /></Box>
                        <Box>
                            <Typography variant="overline" color="grey.300" fontWeight="bold">RESULTADO</Typography>
                            <Typography variant="h4" fontWeight="800" color="#ff9800" sx={{ textTransform: 'capitalize' }}>{result?.plaga}</Typography>
                            <Typography variant="body2" color="grey.200">Confianza: <strong>{result?.confianza}%</strong></Typography>
                        </Box>
                    </Paper>

                    <Typography variant="h6" gutterBottom fontWeight="800" sx={{ mb: 3, color: 'white' }}>Selecciona Nivel de Infestación:</Typography>
                    
                    <Grid container spacing={2} sx={{ mb: 5 }}>
                        {NIVELES_INFESTACION.map((nivel) => (
                            <Grid item xs={12} md={4} key={nivel.val}>
                                <Card 
                                    elevation={0} onClick={() => setInfestationLevel(nivel.val)}
                                    sx={{ 
                                        cursor: 'pointer', border: infestationLevel === nivel.val ? `2px solid ${nivel.color}` : '1px solid #444',
                                        bgcolor: infestationLevel === nivel.val ? `${nivel.color}20` : '#2b2b2b',
                                        transition: 'all 0.2s', 
                                        boxShadow: infestationLevel === nivel.val ? `0 0 20px ${nivel.color}40` : 'none',
                                        '&:hover': { transform: 'translateY(-4px)', borderColor: nivel.color }
                                    }}
                                >
                                    <CardActionArea sx={{ p: 3, height: '100%' }}>
                                        <Box sx={{ color: nivel.color, mb: 2 }}>{nivel.icon}</Box>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>{nivel.label}</Typography>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: nivel.color }}>{nivel.sub}</Typography>
                                        <Typography variant="body2" color="grey.400">{nivel.desc}</Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Button variant="contained" fullWidth size="large" onClick={() => setActiveStep(2)} endIcon={<ArrowForwardIcon />} sx={{ py: 2, borderRadius: 2, fontWeight: 'bold', fontSize: '1.1rem', bgcolor: '#8bdd2e', color: '#121212', '&:hover': { bgcolor: '#79c026' } }}>
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
            <Card id="report-content" elevation={0} sx={{ borderRadius: 4, border: '1px solid #333', overflow: 'hidden', bgcolor: '#1e1e1e' }}>
                <Box sx={{ bgcolor: '#2b2b2b', color: 'white', p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
                    <Box>
                        <Button startIcon={<ArrowBackIcon />} sx={{ color: 'grey.400', mb: 1, '&:hover': { bgcolor: '#444'} }} onClick={() => setActiveStep(1)}>Atrás</Button>
                        <Typography variant="h5" fontWeight="bold">Informe Técnico</Typography>
                    </Box>
                    <Button 
                        variant="outlined" 
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }} 
                        startIcon={<PictureAsPdfIcon />}
                        onClick={handleDownloadPDF}
                    >
                        Descargar PDF
                    </Button>
                </Box>

                <CardContent sx={{ p: 4, color: 'white' }}>
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#2b2b2b', mb: 4, border: '1px solid #444' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" color="grey.300" fontWeight="bold">CULTIVO</Typography>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>{selectedCrop}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" color="grey.300" fontWeight="bold">PLAGA</Typography>
                                <Typography variant="subtitle1" fontWeight="bold" color="#f44336">{result?.plaga}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" color="grey.300" fontWeight="bold">GRAVEDAD</Typography>
                                <Chip label={infestationLevel} size="small" sx={{ bgcolor: infestationLevel === 'Alta' ? '#da1c0f20' : infestationLevel === 'Media' ? '#ff980020' : '#4caf5020', color: infestationLevel === 'Alta' ? '#ef9a9a' : infestationLevel === 'Media' ? '#ffcc80' : '#a5d6a7', fontWeight: '900' }} />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" color="grey.300" fontWeight="bold">FECHA</Typography>
                                <Typography variant="subtitle1" fontWeight="bold">{new Date().toLocaleDateString()}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    {infoPlagas[result.plaga] && (
                        <Box>
                            <Typography variant="h6" gutterBottom fontWeight="800" sx={{ display: 'flex', alignItems: 'center', color: '#8bdd2e', mb: 2 }}>
                                <LocalHospitalIcon sx={{ mr: 1 }} /> Plan de Manejo Sugerido
                            </Typography>
                            
                            <Alert severity={infestationLevel === 'Alta' ? 'error' : 'info'} sx={{ mb: 4, borderRadius: 2, bgcolor: '#2b2b2b', color: 'white', border: `1px solid ${infestationLevel === 'Alta' ? '#f44336' : '#29b6f6'}` }}>
                                <AlertTitle fontWeight="bold">Estrategia</AlertTitle>
                                {infestationLevel === 'Alta' ? 'La severidad es crítica. Se recomienda acción inmediata.' : 'Nivel manejable. Priorice control biológico.'}
                            </Alert>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 3, bgcolor: '#2f3b2f', border: '1px solid #4caf5060' }}>
                                        <Typography variant="subtitle2" fontWeight="bold" color="#a5d6a7" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}><SpaIcon fontSize="small" sx={{ mr: 1 }} /> BIOLÓGICO</Typography>
                                        <List dense disablePadding>{infoPlagas[result.plaga].tratamientoBio.map((t: string, i: number) => (<ListItem key={i} disableGutters sx={{ pb: 1 }}><ListItemIcon sx={{ minWidth: 28 }}><CheckCircleIcon fontSize="small" sx={{ color: '#8bdd2e' }} /></ListItemIcon><ListItemText primary={t} primaryTypographyProps={{ fontWeight: 500, color: '#e8f5e9' }} /></ListItem>))}</List>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 3, bgcolor: '#3a2f2f', border: '1px solid #f4433660' }}>
                                        <Typography variant="subtitle2" fontWeight="bold" color="#ef9a9a" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}><ScienceIcon fontSize="small" sx={{ mr: 1 }} /> QUÍMICO</Typography>
                                        <List dense disablePadding>{infoPlagas[result.plaga].tratamientoQuim.map((t: string, i: number) => (<ListItem key={i} disableGutters sx={{ pb: 1 }}><ListItemIcon sx={{ minWidth: 28 }}><WarningIcon fontSize="small" sx={{ color: '#f44336' }} /></ListItemIcon><ListItemText primary={t} primaryTypographyProps={{ fontWeight: 500, color: '#ffebee' }} /></ListItem>))}</List>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Button variant="text" color="inherit" onClick={handleReset} startIcon={<RestartAltIcon />} sx={{ color: 'grey.500', '&:hover': { bgcolor: '#333'} }}>Iniciar Nuevo Análisis</Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>

        <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: 20 }}>
                <Paper elevation={0} sx={{ p: 0, bgcolor: '#1e1e1e', color: 'white', mb: 2, border: '1px solid #333', borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ p: 2, bgcolor: '#2b2b2b', borderBottom: '1px solid #333' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="#8bdd2e">🤖 Asistente Virtual</Typography>
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
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3, bgcolor: '#121212' }}>
        <Modal
            open={cameraOpen}
            onClose={handleCloseCamera}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper sx={{ p: 2, bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 4, width: '90%', maxWidth: '600px' }}>
                <Typography variant="h6" color="white" gutterBottom>Tomar Foto</Typography>
                <Box sx={{ position: 'relative', mb: 2 }}>
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '8px' }} />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </Box>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={handleCloseCamera} sx={{ color: 'grey.400', borderColor: 'grey.600' }}>Cancelar</Button>
                    <Button variant="contained" onClick={handleTakePhoto} sx={{ bgcolor: '#8bdd2e', color: '#121212', '&:hover': { bgcolor: '#79c026' } }}>
                        Capturar
                    </Button>
                </Stack>
            </Paper>
        </Modal>
        <Box sx={{ width: '100%', mb: 5 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {PASOS.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconProps={{
                        sx: {
                          color: '#444',
                          '&.Mui-active': {
                            color: '#8bdd2e',
                            boxShadow: '0 0 15px #8bdd2e',
                            borderRadius: '50%',
                          },
                          '&.Mui-completed': {
                            color: '#8bdd2e',
                          },
                        },
                      }}
                      sx={{
                        '.MuiStepLabel-label': {
                          color: 'grey.600',
                          '&.Mui-active': {
                            color: 'white',
                          },
                          '&.Mui-completed': {
                            color: 'grey.400',
                          },
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
            </Stepper>
        </Box>
        {activeStep === 0 && renderStep1()}
        {activeStep === 1 && renderStep2()}
        {activeStep === 2 && renderStep3()}
    </Box>
  );
}