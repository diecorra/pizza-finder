import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Result } from '../../model/CitiesProps';
import { fetchCities } from '../../services/fetchCities';
import { HOCData } from '../../shared/HOCData';
import TableData from '../../shared/TableData';
import { CITIES_APIKEY } from '../../shared/citiesApiKey';
import pizzaicon from '../../assets/favicon-pizza.webp';

const Home = () => {
  const [input, setInput] = useState('');

  const infoUseQuery = useQuery<boolean, AxiosError<any, any>, Result[]>(
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
    <div className="flex flex-col justify-around gap-10">
      <div className="flex items-center justify-center gap-1">
        <h1>PIZZA FINDER</h1>
        <img className="w-10" src={pizzaicon} alt="Pizza icon" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <form className="input-wrapper" onSubmit={handleSearch}>
          <input
            className="mx-3"
            pattern=".{3,}"
            type="text"
            name="city"
            placeholder="Search city, town.."
            value={input}
            onChange={(e) => handleInputValue(e.target.value)}
          />
          <button className="mx-2" type="submit">
            <SearchIcon sx={{ color: '#130F49', cursor: 'pointer' }} />
          </button>
          <p className="w-7/12 text-black mr-2">
            {infoUseQuery?.data && !infoUseQuery?.error
              ? 'Results: ' + infoUseQuery?.data?.length
              : 'Results: ' + 0}
          </p>
        </form>
        <HOCData infoUseQuery={infoUseQuery}>
          <TableData data={infoUseQuery?.data}></TableData>
        </HOCData>
      </div>
    </div>
  );
};

export default Home;
