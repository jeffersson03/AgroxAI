'use client';

import { Box, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Image from 'next/image';
import logoGrande from '@/components/ui/shapes/logoGrandeLetra.png';
import logoGrandeForma from '@/components/ui/shapes/logoGrandeForma.png';
import forma1 from '@/components/ui/shapes/forma1.png';
import forma2 from '@/components/ui/shapes/forma2.png';
import forma3 from '@/components/ui/shapes/forma3.png';

export default function HomePageClient() {
  return (
    <>
      {/* Shape 1 */}
      <Box
        className="neon-glow"
        sx={{
          position: 'absolute',
          top: '20vh',
          left: '-100px',
          animation: 'pulse 5s infinite ease-in-out',
        }}
      >
        <Image
          src={forma3}
          alt="Forma 1"
          width={300}
          height={300}
          placeholder="blur"
        />
      </Box>

      {/* Shape 2 */}
      <Box
        className="neon-glow"
        sx={{
          position: 'absolute',
          top: '100vh',
          right: '-150px',
          animation: 'pulse 6s infinite ease-in-out',
        }}
      >
        <Image
          src={forma1}
          alt="Forma 2"
          width={500}
          height={500}
          placeholder="blur"
        />
      </Box>

      {/* Shape 3 */}
      <Box
        className="neon-glow"
        sx={{
          position: 'absolute',
          top: '180vh',
          left: '-120px',
          animation: 'pulse 5s infinite ease-in-out',
        }}
      >
        <Image
          src={forma2}
          alt="Forma 3"
          width={400}
          height={400}
          placeholder="blur"
        />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '2rem 4rem',
            borderRadius: '16px',
            backdropFilter: 'blur(1px)',
          }}
        >
          <Box
            className="techno-border"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '16px',
              padding: '1rem',
            }}
          >
            <Image
              src={logoGrande}
              alt="AgroxAI Logo Letras"
              width={400}
              height={120}
              placeholder="blur"
              style={{ objectFit: 'contain' }}
            />
            <Box sx={{ mt: -4 }}>
              <Image
                src={logoGrandeForma}
                alt="AgroxAI Logo Forma"
                width={250}
                height={80}
                placeholder="blur"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>
          
          <Box sx={{ width: '100%', height: '2px', position: 'relative', overflow: 'hidden', mt: 2 }}>
            <Box sx={{
              position: 'absolute',
              height: '100%',
              width: '150px',
              background: 'linear-gradient(90deg, transparent, #8bdd2e, transparent)',
              animation: 'sweep-right 3s linear infinite',
            }}/>
          </Box>

          <p style={{ marginTop: '1.5rem', fontSize: '1.70rem' }}>
            Tu Asistente inteligente para la Salud de tus cultivos
          </p>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
            <Typography sx={{ fontSize: '1.3rem', color: 'white' }}>Desplázate para explorar</Typography>
            <ArrowDownwardIcon sx={{ color: '#8bdd2e', fontSize: '3rem', animation: 'bounce 2s infinite', marginTop: '0.5rem' }} />
          </Box>
        </Box>
      </Box>

      {/* Keyframes for animations are in the parent page now to avoid duplication */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-15px);
            }
            60% {
              transform: translateY(-8px);
            }
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 0.7;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.03);
            }
          }
          @keyframes sweep-right {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(350%);
            }
          }
          @keyframes sweep-left {
            0% {
              transform: translateX(350%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </>
  );
}
