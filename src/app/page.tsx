import { Box } from '@mui/material';
import { getCultivos } from '@/services/cultivoService';
import CultivoCarousel from '@/components/cultivos/CultivoCarousel';
import HomePageClient from '@/components/home/HomePageClient';

export default async function HomePage() {
  // Fetch data on the server using the dedicated service
  const { cultivos, error } = await getCultivos();
  if (error) {
    // The service already logs the error, but you could add more handling here
    // For example, render a specific error component
  }

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        color: 'white',
      }}
    >
      {/* Client component for the interactive welcome section */}
      <HomePageClient />
      
      {/* Carousel section, rendered below the welcome screen */}
      <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        <CultivoCarousel cultivos={cultivos} />
      </Box>

      {/* Spacers for scrolling if needed, can be adjusted */}
      <Box sx={{ height: '50vh' }} />
    </Box>
  );
}
