'use client';

import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { Box, Typography, Card } from '@mui/material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

type Crop = {
  name: string;
  img: string;
  desc: string;
};

type LandingCarouselProps = {
  cultivos: Crop[];
};

export default function LandingCarousel({ cultivos }: LandingCarouselProps) {
  const MIN_SLIDES_FOR_LOOP = 6; // A higher number is better for coverflow
  let displayCultivos = cultivos || [];
  
  if (displayCultivos.length > 0 && displayCultivos.length < MIN_SLIDES_FOR_LOOP) {
    while (displayCultivos.length < MIN_SLIDES_FOR_LOOP) {
      displayCultivos = [...displayCultivos, ...cultivos];
    }
  }

  const autoplayConfig = useMemo(() => ({
    delay: 0, // Delay of 0 with linear transition creates the marquee effect
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }), []);

  if (!cultivos || cultivos.length === 0) {
    return null; // Don't render anything if there are no crops
  }

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Show 3 slides at a time
        loop={true}
        speed={1700} // High speed for a smooth, long transition
        autoplay={autoplayConfig}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100, // Reduced depth to bring them closer
          modifier: 1,
          slideShadows: false, // Cleaner look without shadows
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="landingSwiper"
      >
        {displayCultivos.map((crop, index) => (
          <SwiperSlide key={`${crop.name}-${index}`}>
            <Card 
              elevation={0} 
              sx={{ 
                height: '250px',
                borderRadius: 4, 
                bgcolor: '#333',
                border: '1px solid #555',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                textAlign: 'center'
              }}
            >
              <Image src={crop.img} alt={crop.name} width={100} height={100} style={{ objectFit: 'contain' }} />
              <Typography variant="h6" fontWeight="bold" color="white" sx={{ mt: 2 }}>
                {crop.name}
              </Typography>
              <Typography variant="body2" color="grey.400" sx={{ mt: 1 }}>
                {crop.desc}
              </Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .landingSwiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </>
  );
}
