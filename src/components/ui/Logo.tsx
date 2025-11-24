import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import logo from './shapes/logo.png'; // Statically import the logo image

export default function Logo() {
  return (
    <>
      <style>
        {`
          @keyframes logo-pulse {
            0%, 100% {
              opacity: 0.85;
            }
            50% {
              opacity: 1;
            }
          }
        `}
      </style>
      <Box
        component="a"
        href="/"
        className="neon-glow" // Apply the global neon glow effect
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          textDecoration: 'none',
          height: '40px', // Adjust height as needed
          animation: 'logo-pulse 4s infinite ease-in-out', // Apply the new subtle pulse
        }}
      >
        <Image
          src={logo} // Use the imported image object
          alt="AgroxAI Logo"
          width={180} // Corrected base width for aspect ratio
          height={100} // Corrected base height for aspect ratio
          placeholder="blur"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>
    </>
  );
}
