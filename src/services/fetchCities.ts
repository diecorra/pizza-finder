import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { CitiesProps, DataApiCity } from 'model/citiesProps';

const APIKEY = import.meta.env.VITE_API_KEY;

export const useFetchCities = (city: string) => {
  return useQuery<DataApiCity[], AxiosError<any, any>>(
    ['city'],
    () => fetchCities(city),
    { enabled: false }
  );
};

export const fetchCities = async (city: string) => {
  const result = await axios.get<CitiesProps>(
    ` https://api.opencagedata.com/geocode/v1/json?key=${APIKEY}&q=${city}`
  );

  return filteredCityAndVillageResults(result.data?.results);
};

const filteredCityAndVillageResults = (results: DataApiCity[]) => {
  return results.filter(
    (result: DataApiCity) =>
      result.components._type === 'city' ||
      result.components._type === 'village'
  );
};
