'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import logoGrande from '../components/ui/shapes/logoGrandeLetra.png';
import logoGrandeForma from '../components/ui/shapes/logoGrandeForma.png';
// Import the new PNG assets from their specified location
import forma1 from '@/components/ui/shapes/forma1.png';
import forma2 from '@/components/ui/shapes/forma2.png';
import forma3 from '@/components/ui/shapes/forma3.png';

export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        minHeight: '300vh',
        width: '100%',
        overflowX: 'hidden',// Dark background color
        color: 'white', // Set default text color
      }}
    >
      {/* Shape 1 */}
      <Box
        className="neon-glow" // Added neon-glow effect
        sx={{
          position: 'absolute',
          top: '20vh',
          left: '-100px', // Moved further to the left
          animation: 'pulse 5s infinite ease-in-out',
        }}
      >
        <Image
          src={forma1} // Corrected image src
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
          right: '-150px', // Moved further to the right
          animation: 'pulse 6s infinite ease-in-out',
        }}
      >
        <Image
          src={forma2} // Corrected image src
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
          left: '-120px', // Moved further to the left
          animation: 'pulse 5s infinite ease-in-out',
        }}
      >
        <Image
          src={forma3} // Corrected image src
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

          {/* This Box contains the border animation */}
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
          
          {/* BOTTOM sweeping line animation container */}
          <Box sx={{ width: '100%', height: '2px', position: 'relative', overflow: 'hidden', mt: 2 }}>
            <Box sx={{
              position: 'absolute',
              height: '100%',
              width: '150px', // Width of the gradient line
              background: 'linear-gradient(90deg, transparent, #8bdd2e, transparent)',
              animation: 'sweep-right 3s linear infinite',
            }}/>
          </Box>

          <p style={{ marginTop: '1.5rem', fontSize: '1.25rem' }}>
            Plataforma para la identificación de plagas con IA.
          </p>
          <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
            ↓ Desplázate para explorar ↓
          </p>
        </Box>
      </Box>

      {/* Spacers for scrolling */}
      <Box sx={{ height: '100vh' }} />
      <Box sx={{ height: '100vh' }} />

      {/* Keyframes for animations */}
      <style>
        {`
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
    </Box>
  );
}
