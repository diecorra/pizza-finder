import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CitiesProps } from '../../model/CitiesProps';
import { fetchCities } from '../../services/fetchCities';
import { HOCData } from '../../shared/HOCData';
import TableData from '../../shared/TableData';
import { CITIES_APIKEY } from '../../shared/citiesApiKey';
import Sidebar from '../../shared/components/Sidebar';

const Home = () => {
  const infoUseQuery = useQuery<boolean, AxiosError<any, any>, CitiesProps>(
    ['cities'],
    () => fetchCities(CITIES_APIKEY, 'Sommacampagna')
  );

  return (
    <div className="container mx-auto px-12 min-h-screen flex flex-col justify-around">
      <div className="flex flex-col items-òl justify-center">
        <div className="flex">
          <h1 className="text-4xl font-bold text-primary md:text-7xl z-10">
            PIZZA FINDER
          </h1>
          <Sidebar />
        </div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Search city"
            variant="outlined"
          />
          <button>
            <SearchIcon />
          </button>
        </Box>
      </div>
      <div>
        <HOCData infoUseQuery={infoUseQuery}>
          <TableData data={infoUseQuery?.data?.results} />
        </HOCData>
      </div>
    </div>
  );
};

export default Home;
