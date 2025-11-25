'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar,
  Stack,
  Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { infoPlagas } from '@/data/infoPlagas';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface AgroxChatProps {
  plagaDetectada: string;
}

export default function AgroxChat({ plagaDetectada }: AgroxChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Cargar saludo inicial cuando cambia la plaga
  useEffect(() => {
    const nombrePlaga = infoPlagas[plagaDetectada]?.nombre || plagaDetectada;
    setMessages([
      { 
        id: 1, 
        text: `¡Hola! Soy tu asistente Agrox. 🤖\n\nHe analizado la imagen y detecté **${nombrePlaga}**.\n\n¿Qué te gustaría saber?\nEj: "¿Cómo lo curo?", "¿Qué síntomas tiene?", "¿Tratamiento natural?"`, 
        sender: 'bot' 
      }
    ]);
  }, [plagaDetectada]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- CEREBRO DEL BOT (Lógica de Respuestas) ---
  const generarRespuesta = (pregunta: string) => {
    const info = infoPlagas[plagaDetectada];
    const p = pregunta.toLowerCase();

    if (!info) return "Lo siento, no tengo información detallada cargada para esta plaga específica.";

    // 1. Preguntas sobre TRATAMIENTO GENERAL
    if (p.includes('curar') || p.includes('tratar') || p.includes('matar') || p.includes('eliminar') || p.includes('solucion') || p.includes('hago')) {
      if (p.includes('natural') || p.includes('biologico') || p.includes('organico') || p.includes('casero')) {
         return `🌿 **Tratamiento Biológico Recomendado:**\n\n${info.tratamientoBio.map(t => `• ${t}`).join('\n')}`;
      }
      if (p.includes('quimico') || p.includes('fuerte') || p.includes('insecticida') || p.includes('veneno')) {
         return `🧪 **Control Químico:**\n\n${info.tratamientoQuim.map(t => `• ${t}`).join('\n')}\n\n⚠️ *Recuerda usar equipo de protección.*`;
      }
      return `Para la **${info.nombre}** tienes dos opciones:\n\n🌿 **Orgánico:** ${info.tratamientoBio[0]}...\n🧪 **Químico:** ${info.tratamientoQuim[0]}...\n\n¿Cuál prefieres detallar?`;
    }

    // 2. Preguntas sobre SÍNTOMAS / IDENTIFICACIÓN
    if (p.includes('sintoma') || p.includes('daño') || p.includes('ver') || p.includes('reconocer') || p.includes('pasa')) {
      return `🔍 **Signos principales:**\n\n${info.sintomas.map(s => `• ${s}`).join('\n')}`;
    }

    // 3. Preguntas sobre QUÉ ES
    if (p.includes('que es') || p.includes('descripcion') || p.includes('informacion')) {
      return `📖 **${info.nombre}** (${info.nombreCientifico}):\n\n${info.descripcion}`;
    }

    // 4. Saludos / Cierre
    if (p.includes('hola') || p.includes('buenas')) return "¡Hola de nuevo! ¿En qué te ayudo con tu cultivo?";
    if (p.includes('gracias') || p.includes('chau') || p.includes('listo')) return "¡De nada! Éxitos con tu cosecha. 🌱";

    // 5. Default
    return "No estoy seguro de entender. Intenta preguntar por:\n• Síntomas\n• Tratamiento biológico\n• Tratamiento químico";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input;
    const userMsg: Message = { id: Date.now(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simular tiempo de pensamiento
    setTimeout(() => {
      const respuesta = generarRespuesta(userText);
      const botMsg: Message = { id: Date.now() + 1, text: respuesta, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000); // 1 segundo de delay
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Área de Mensajes */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        maxHeight: '400px',
        minHeight: '300px'
      }}>
        {messages.map((msg) => (
          <Box 
            key={msg.id} 
            sx={{ 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
            }}
          >
            <Paper 
                elevation={0}
                sx={{ 
                    p: 1.5, 
                    bgcolor: msg.sender === 'user' ? 'primary.main' : '#333',
                    color: 'white',
                    borderRadius: 2,
                    borderTopRightRadius: msg.sender === 'user' ? 0 : 2,
                    borderTopLeftRadius: msg.sender === 'bot' ? 0 : 2,
                }}
            >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
                    {msg.text}
                </Typography>
            </Paper>
            <Typography variant="caption" sx={{ color: '#666', mt: 0.5, display: 'block', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                {msg.sender === 'user' ? 'Tú' : 'AgroxBot'}
            </Typography>
          </Box>
        ))}
        
        {isTyping && (
            <Box sx={{ alignSelf: 'flex-start', ml: 1 }}>
                <Typography variant="caption" sx={{ color: '#aaa', fontStyle: 'italic' }}>Escribiendo...</Typography>
            </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Área de Input */}
      <Box sx={{ p: 2, bgcolor: '#1f1f1f', borderTop: '1px solid #333' }}>
        <Stack direction="row" spacing={1}>
            <TextField 
                fullWidth 
                size="small" 
                placeholder="Escribe tu consulta..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                sx={{ 
                    bgcolor: '#2c2c2c', 
                    borderRadius: 1,
                    input: { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'transparent' },
                        '&:hover fieldset': { borderColor: 'transparent' },
                        '&.Mui-focused fieldset': { borderColor: 'transparent' },
                    }
                }}
            />
            <IconButton 
                color="primary" 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, '&.Mui-disabled': { bgcolor: '#333', color: '#555' } }}
            >
                <SendIcon />
            </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}