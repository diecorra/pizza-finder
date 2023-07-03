import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CitiesProps } from '../../model/CitiesProps';
import { fetchCities } from '../../services/fetchCities';
import { HOCData } from '../../shared/HOCData';
import TableData from '../../shared/TableData';
import { CITIES_APIKEY } from '../../shared/citiesApiKey';

const Home = () => {
  const infoUseQuery = useQuery<boolean, AxiosError<any, any>, CitiesProps>(
    ['cities'],
    () => fetchCities(CITIES_APIKEY, 'Sommacampagna')
  );

  return (
    <div className="flex flex-col justify-around">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary md:text-7xl z-10">
          PIZZA FINDER
        </h1>
      </div>
      <div className="flex flex-col gap-10">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: '5rem',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search city"
            variant="outlined"
            className="mx-1"
          />
          <button>
            <SearchIcon />
          </button>
        </Box>
        <HOCData infoUseQuery={infoUseQuery}>
          <TableData data={infoUseQuery?.data?.results} />
        </HOCData>
      </div>
    </div>
  );
};

export default Home;
