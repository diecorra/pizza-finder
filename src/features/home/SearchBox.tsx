import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField } from '@mui/material';

export function SearchBox() {
  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Search city" variant="outlined" />
      </Box>
      <button>
        <SearchIcon />
      </button>
    </>
  );
}
