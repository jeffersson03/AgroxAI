'use client';

import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

// Define the type for a single cultivo
type Cultivo = {
  nombre_comun: string;
  referencia_imagen_url: string;
};

// Define the props for the component
type CultivoCarouselProps = {
  cultivos: Cultivo[];
};

export default function CultivoCarousel({ cultivos }: CultivoCarouselProps) {
  // --- Hooks and logic must be at the top level ---
  const MIN_SLIDES_FOR_LOOP = 4;
  
  let displayCultivos = cultivos || [];
  
  // If we have slides, but not enough for a seamless loop, duplicate them until we do.
  // This satisfies Swiper's requirement and removes the loop warning.
  if (displayCultivos.length > 0 && displayCultivos.length < MIN_SLIDES_FOR_LOOP) {
    while (displayCultivos.length < MIN_SLIDES_FOR_LOOP) {
      displayCultivos = [...displayCultivos, ...cultivos];
    }
  }

  // Loop can be enabled if we have at least one original slide.
  const isLoopingEnabled = cultivos && cultivos.length > 0;

  // Memoize autoplay config to prevent re-render loops.
  // Dependency array is empty as the config doesn't need to change.
  const autoplayConfig = useMemo(() => ({
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }), []);


  // --- Conditional return can only happen AFTER all hooks are called ---
  if (!cultivos || cultivos.length === 0) {
    return <Typography>No se encontraron cultivos.</Typography>;
  }

  return (
    <Box sx={{ width: '100%', py: 8 }}>
      <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: 'white', mb: 4 }}>
        Nuestros Cultivos
      </Typography>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={isLoopingEnabled}
        autoplay={autoplayConfig}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="cultivoSwiper"
      >
        {displayCultivos.map((cultivo, index) => (
          <SwiperSlide key={`${cultivo.nombre_comun}-${index}`} style={{ width: '300px', height: '400px' }}>
            <Box
              className="cultivo-slide-content"
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'transform 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                '& .overlay': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                },
                '&:hover .overlay': {
                  opacity: 1,
                },
              }}
            >
              <Image
                src={cultivo.referencia_imagen_url}
                alt={cultivo.nombre_comun}
                sizes="(max-width: 600px) 90vw, 300px"
                fill
                style={{ objectFit: 'cover' }}
              />
              <Box className="overlay">
                <Typography variant="h5">{cultivo.nombre_comun}</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
