import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <Box className="flex justify-center items-center h-full">
      <CircularProgress size="5rem" className="!text-primary" />
    </Box>
  );
}
