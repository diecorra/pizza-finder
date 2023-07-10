import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size="10rem" color="success" />
    </Box>
  );
}
