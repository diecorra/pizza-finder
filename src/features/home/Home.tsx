import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { CitiesProps } from '../../model/CitiesProps';
import { fetchCities } from '../../services/fetchCities';
import { HOCData } from '../../shared/HOCData';
import TableData from '../../shared/TableData';
import { CITIES_APIKEY } from '../../shared/citiesApiKey';

const Home = () => {
  const [input, setInput] = useState('');

  const infoUseQuery = useQuery<boolean, AxiosError<any, any>, CitiesProps>(
    ['city'],
    () => fetchCities(CITIES_APIKEY, input),
    { enabled: false }
  );

  const handleInputValue = (value: string) => {
    setInput(value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    infoUseQuery.refetch();
  };

  return (
    <div className="flex flex-col justify-around gap-28">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary md:text-7xl z-10">
          PIZZA FINDER
        </h1>
      </div>
      <div className="flex flex-col items-center gap-3">
        <form className="input-wrapper" onSubmit={handleSearch}>
          <input
            pattern=".{3,}"
            type="text"
            name="city"
            placeholder="Search city..."
            value={input}
            onChange={(e) => handleInputValue(e.target.value)}
          />
          <button className="mx-3" type="submit">
            <SearchIcon sx={{ color: '#130F49', cursor: 'pointer' }} />
          </button>
        </form>
        <HOCData infoUseQuery={infoUseQuery}>
          <TableData data={infoUseQuery?.data?.results}></TableData>
        </HOCData>
      </div>
    </div>
  );
};

export default Home;
