import { Autocomplete, Rating, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { Result } from '../../model/CitiesProps';
import { fetchCities } from '../../services/fetchCities';

const NewReview = () => {
  const [rate, setRate] = React.useState<number | null>(2);
  const [city, setCity] = React.useState('');
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

  useEffect(() => {
    if (citiesFound) {
      setOptions(citiesFound.map((city) => city.formatted));
      console.log(citiesFound.map((city) => city.formatted));
    }
  }, [citiesFound]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit gap-4 bg-indigo-900 rounded pb-4">
      <h2 className="border-4 rounded p-4 w-full text-center bg-indigo-400 border-black">
        How was your experience?
      </h2>
      <form>
        <div className="flex flex-col items-center gap-2 w-[25rem]">
          <div className="flex bg-indigo-300 rounded p-1 w-full justify-center items-center">
            <p className="w-[40%]">Your Name</p>
            <input className="p-1" type="text" placeholder="your name.." />
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-full">
            <p className="w-[40%]">Title</p>
            <input className="p-1" type="text" placeholder="title.." />
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-full">
            <p className="w-[40%]">Description</p>
            <textarea
              className="p-1 h-32 text-black rounded w-[100%]"
              name="Text1"
              placeholder="description.."
            ></textarea>
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-full">
            <p className="w-[40%]">City</p>
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
          <div className="flex bg-indigo-300 rounded p-1 w-full">
            <p className="w-[40%]">Rating</p>
            <Rating
              name="rate-pizzeria"
              className="w-[100%]"
              value={rate}
              onChange={(event, newRate) => {
                setRate(newRate);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewReview;
