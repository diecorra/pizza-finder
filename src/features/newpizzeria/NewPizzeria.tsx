import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { Result } from '../../model/CitiesProps';
import { fetchCities } from '../../services/fetchCities';

const NewPizzeria = () => {
  const [rate, setRate] = React.useState<number | null>(4);
  const [city, setCity] = React.useState('');
  const [localization, setLocalization] = React.useState('');
  const [options, setOptions] = React.useState<string[]>(['']);

  const {
    data: citiesFound,
    isLoading,
    isError,
  } = useQuery<boolean, AxiosError<any, any>, Result[]>([city], () =>
    fetchCities(city)
  );

  const onInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setCity(value);
  };

  const handleSave = () => {
    console.log();
  };

  useEffect(() => {
    if (citiesFound) {
      setOptions(citiesFound.map((city) => city.formatted));
      console.log(citiesFound.map((city) => city.formatted));
    }
  }, [citiesFound]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit gap-4 bg-indigo-900 rounded pb-4">
      <h2 className="border-4 rounded p-4 w-full text-center bg-indigo-400 border-black">
        Add New Pizzeria
      </h2>
      <form>
        <div className="flex flex-col items-center gap-2 w-[25rem]">
          <div className="flex bg-indigo-300 rounded p-1 w-full justify-center items-center">
            <p className="w-[40%]">Name</p>
            <input className="p-1" type="text" placeholder="type name.." />
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-full">
            <p className="w-[40%]">Location</p>
            <Autocomplete
              className="bg-indigo-300 font-bold w-[100%]"
              inputValue={city}
              onInputChange={onInputChange}
              onChange={(event: any, newValue: string | null) => {
                if (newValue) {
                  setCity(newValue);
                }
              }}
              options={options}
              // value={city}
              renderInput={(params) => (
                <TextField
                  placeholder="Select"
                  {...params}
                  style={{
                    fontFamily: 'Belanosima',
                    fontSize: '1.125rem',
                    backgroundColor: 'white',
                  }}
                />
              )}
            />
          </div>
          <button
            className="bg-red-500 m-3 p-2 rounded-xl"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPizzeria;
