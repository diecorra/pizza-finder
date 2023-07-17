import {
  Autocomplete,
  AutocompleteInputChangeReason,
  Rating,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { Result } from '../../model/CitiesProps';
import { fetchCities } from '../../services/fetchCities';
import { CITIES_APIKEY } from '../../shared/citiesApiKey';

const NewReview = () => {
  const [rate, setRate] = React.useState<number | null>(2);
  const [city, setCity] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const infoUseQuery = useQuery<boolean, AxiosError<any, any>, Result[]>(
    ['city'],
    () => fetchCities(CITIES_APIKEY, city),
    { enabled: false }
  );

  const onInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (value.length >= 2) {
      setCity(value);
      infoUseQuery.refetch();
      //setOptions(infoUseQuery);
    } else {
      setOptions([]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit gap-4 bg-indigo-900 rounded pb-4">
      <h2 className="border-4 rounded p-4 w-full text-center bg-indigo-400 border-black">
        How was your experience?
      </h2>
      <form>
        <div className="flex flex-col items-center gap-2">
          <div className="flex bg-indigo-300 rounded p-1 w-96">
            <p className="w-full">Your Name :</p>
            <input className="p-1" type="text" placeholder="your name.." />
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-96">
            <p className="w-full">Title :</p>
            <input className="p-1" type="text" placeholder="title.." />
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-96">
            <p className="w-full">Description :</p>
            <textarea
              className="p-1 h-32 w-96 text-black rounded"
              name="Text1"
              placeholder="description.."
            ></textarea>
          </div>
          <Autocomplete
            className="bg-indigo-300 w-full font-bold"
            disablePortal
            onInputChange={onInputChange}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  style: { fontFamily: 'Belanosima', fontSize: '1.125rem' },
                }}
                label="City"
              />
            )}
          />
          <div className="flex bg-indigo-300 rounded p-1 w-96">
            <p className="w-full">Rating :</p>
            <Rating
              name="rate-pizzeria"
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
