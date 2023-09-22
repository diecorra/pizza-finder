import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import pizzaicon from 'assets/favicon-pizza.webp';
import { AxiosError } from 'axios';
import { DataApiCity } from 'model/citiesProps';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { fetchCities } from 'services/fetchCities';
import { HOCData } from 'shared/HOCData';
import TableData from 'shared/TableData';
import { buttonStyle } from 'utils/style';

const Home = () => {
  const serchText = useRef('');

  const infoUseQuery = useQuery<boolean, AxiosError<any, any>, DataApiCity[]>(
    ['city'],
    () => fetchCities(serchText.current),
    { enabled: serchText.current.length > 3 }
  );
  const { error, data } = infoUseQuery;

  const handleInputValue = (
    text: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (text.target && text.target.value.match(/.{3,}/g)) {
      serchText.current = text.target.value;
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    infoUseQuery.refetch();
  };
  return (
    <div className="flex flex-col justify-around gap-10 h-full">
      <div className="flex items-center justify-center gap-1">
        <h1>PIZZA FINDER</h1>
        <img className="w-10" src={pizzaicon} alt="Pizza icon" />
      </div>
      <div className="flex flex-col items-center gap-3 h-full">
        <form className="input-wrapper" onSubmit={handleSearch}>
          <TextField
            size="small"
            className="mx-3 bg-white rounded-lg"
            name="city"
            placeholder="Search city, town.."
            inputRef={serchText}
            onChange={handleInputValue}
          />
          <Button className="mx-2" type="submit" size="large" sx={buttonStyle}>
            <SearchIcon className="text-primary cursor-pointer" />
          </Button>
        </form>
        {data && data.length > 0 ? (
          <HOCData<DataApiCity[]> infoUseQuery={infoUseQuery}>
            <TableData data={data}></TableData>
          </HOCData>
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
};

export default Home;
