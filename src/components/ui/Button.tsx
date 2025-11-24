'use client';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const NeonButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // --accent-primary
  color: theme.palette.background.default,     // --bg-deep
  border: 'none',
  padding: '12px 24px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light, // --accent-glow
    boxShadow: `0 0 20px ${theme.palette.primary.main}66`, // main color with 40% opacity for glow
    transform: 'translateY(-2px)',
  },
}));

export default NeonButton;
